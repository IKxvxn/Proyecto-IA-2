import * as Utilities from './generator'
import * as Codes from './codes'
import { Select } from 'antd';

// ----------------------------------------------------------------------------------------------------------

export function genetic(Agents, Orders, NGenerations, PopulationSize)
{
    var Population = GenerateInitialPopulation(Agents, Orders, PopulationSize)
    var NaturalSelected = [] 
    var NumberOfExtractions = Math.ceil(0.3 * PopulationSize)
    var MutatePercentage = 1
    var TopFitnessValue = 1000000
    
    while (0 <= NGenerations || TopFitnessValue <= 2000)
    {
        NaturalSelected = ExtractTopFitnessIndividuals(Population, NumberOfExtractions)
        Population = IndividualsCrossOver(NaturalSelected, PopulationSize, Orders)
        Population = MutatePopulation(Population, PopulationSize, MutatePercentage, Orders)
        
        TopFitnessValue = ExtractTopFitnessIndividuals(Population, 1)[0].Fitness
        console.log("Fitness de la iteracion -> " + TopFitnessValue)
        // console.log(ExtractTopFitnessIndividuals(Population, 1))

        NGenerations -= 1        
    }
    console.log('<<<<<<<<<<<<<<<- Poblacion Generada ->>>>>>>>>>>>>>>')
    console.log(Population[0])

    console.log(ExtractIndividualsData(ExtractTopFitnessIndividuals(Population, 1)[0]))
    return Population
}

// ----------------------------------------------------------------------------------------------------------

function GenerateInitialPopulation(Agents, Orders, Size)
{
    var Population = []
    var Counter = 0    

    // Generate different populations
    while(Size !== 0){
          
        var Individual = {}
        var OrdersCopy = Orders
        Counter = 0

        // Creates the initial array with agents and empty orders array
        while(Counter < Agents.length){
            Individual[Agents[Counter].key] = {"Agent":Agents[Counter], "Orders":[]}
            Counter += 1
        }
        Counter = 0
        // Distribute all the orders randomly between all the agents        
        while(OrdersCopy.length != 0){            
            
            var AgentIndex = Utilities.getRandomArbitrary(0, Agents.length)
            var OrderIndex = Utilities.getRandomArbitrary(0, OrdersCopy.length)
            
            if(Agents[AgentIndex].codes.includes(OrdersCopy[OrderIndex].code))
            {
                Individual[Agents[AgentIndex].key].Orders.push(OrdersCopy[OrderIndex])
                OrdersCopy = OrdersCopy.filter(e => e !== OrdersCopy[OrderIndex])
                Counter += 1
            }
        }
        //Individual["TotalOrders"] = Counter
        Population.push(Individual)       
        Size -= 1
    }
    // console.log('<<<<<<<<<<<<<<<- Poblacion Inicial ->>>>>>>>>>>>>>>')
    // console.log(Population)
    // console.log('<<<<<<<<<<<<<<<- Poblacion Inicial ->>>>>>>>>>>>>>>')

    return Population
}

// ----------------------------------------------------------------------------------------------------------

function ExtractIndividualsData(Individuals)
{
    var DataPerIndividual = {}
    var GeneralFitnessData = {}
    var GlobalWinningsSum = 0
    var GlobalHoursSum = 0
    var NumberOfAgents = Object.keys(Individuals).length 

    var Counter = 0
    var AgentOrders = []
    var AgentData = {}
    
    for(var AgentID in Individuals){
        AgentData = {"TotalHours": 0, "TotalWinning": 0, "NumberOfOrders": 0, "AverageWinnings": 0}
        AgentOrders = Individuals[AgentID].Orders
        Counter = 0

        while (AgentID != "Fitness" && Counter < AgentOrders.length){
            AgentData.TotalHours += Codes.servicios[AgentOrders[Counter].code].horas
            AgentData.TotalWinning += Codes.servicios[AgentOrders[Counter].code].comision
            Counter += 1
        }
        AgentData.NumberOfOrders += Counter
        AgentData.AverageWinnings = AgentData.TotalWinning / Counter

        GlobalHoursSum += AgentData.TotalHours
        GlobalWinningsSum += AgentData.TotalWinning

        DataPerIndividual[AgentID] = AgentData
    }
    GeneralFitnessData["GlobalHoursSum"] = GlobalHoursSum
    GeneralFitnessData["GlobalWinningsSum"] = GlobalWinningsSum
    GeneralFitnessData["NumberOfAgents"] = NumberOfAgents
    GeneralFitnessData["AverageWinnings"] = GlobalWinningsSum / NumberOfAgents
    GeneralFitnessData["DataPerIndividual"] = DataPerIndividual
    
    // console.log("GENERAL FITNESS DATA")
    // console.log(GeneralFitnessData)

    return GeneralFitnessData
}

// ----------------------------------------------------------------------------------------------------------

function EstimateFitness(Individuals)
{
    var ResultantFitness = 0
    var GeneralFitnessData = ExtractIndividualsData(Individuals)
    var PenalizedHours = 0
    var PenalizedWinnings = 0

    for(var AgentID in GeneralFitnessData.DataPerIndividual)
    {
        PenalizedHours = 40 - GeneralFitnessData.DataPerIndividual[AgentID].TotalHours
        if (PenalizedHours < 0){
            PenalizedHours = Math.abs(PenalizedHours) * 2
        }
        PenalizedWinnings = Math.abs(GeneralFitnessData.AverageWinnings - GeneralFitnessData.DataPerIndividual[AgentID].TotalWinning)

        ResultantFitness += PenalizedHours + PenalizedWinnings
    }
    // console.log("Fitness: " + ResultantFitness)
    return ResultantFitness
}

// ----------------------------------------------------------------------------------------------------------

function ExtractTopFitnessIndividuals(Population, NumberOfExtractions)
{
    var TopFitness = []
    var NaturalSelection = []
    var Counter = 0

    // Extract the fitness for each Individual
    while(Counter < Population.length)
    {
        TopFitness.push({"Index": Counter, "Fitness": EstimateFitness(Population[Counter])})
        Counter += 1
    }

    TopFitness = SortArrayByField(TopFitness, 'Fitness', true).slice(0, NumberOfExtractions)
    Counter = 0

    while (Counter < TopFitness.length)
    {
        Population[TopFitness[Counter].Index]["Fitness"] = TopFitness[Counter].Fitness
        NaturalSelection.push(Population[TopFitness[Counter].Index])
        Counter += 1
    }
    // console.log('<<<<<<<<<<<<<<<- Seleccion Natural ->>>>>>>>>>>>>>>')
    // console.log(NaturalSelection)

    return NaturalSelection
}

// ----------------------------------------------------------------------------------------------------------

function SortArrayByField(Data, FieldName, IsAscendant) {
    var result  = Data.sort(function(a, b) {
        if (IsAscendant) {
            return (a[FieldName] > b[FieldName]) ? 1 : ((a[FieldName] < b[FieldName]) ? -1 : 0);
        } else {
            return (b[FieldName] > a[FieldName]) ? 1 : ((b[FieldName] < a[FieldName]) ? -1 : 0);
        }
    });
    return result;
}

// ----------------------------------------------------------------------------------------------------------

function IndividualsCrossOver(NaturalSelection, PopulationSize, Orders)
{
    var ResultantPopulation = NaturalSelection.slice(0)
    var NumberOfAgents = Object.keys(NaturalSelection[0]).length
    var FatherA = {}
    var FatherB = {}
    var FatherAKeys = []
    var FatherBKeys = []
    var PredecessorA = {}
    var PredecessorB = {}
    var SliceIndex = Math.ceil(NumberOfAgents / 2)
    var Counter = 0

    while (PopulationSize > ResultantPopulation.length)
    {
        // Choose two fathers from the NaturalSelection
        FatherA = NaturalSelection[Utilities.getRandomArbitrary(0, NaturalSelection.length)]
        FatherB = NaturalSelection[Utilities.getRandomArbitrary(0, NaturalSelection.length)]
        FatherAKeys = Object.keys(FatherA)
        FatherBKeys = Object.keys(FatherB)

        Counter = 0        
        PredecessorA = {}
        PredecessorB = {}

        while (Counter < FatherAKeys.length - 1){
            if (Counter < SliceIndex){
                PredecessorA[FatherAKeys[Counter]] = FatherA[FatherAKeys[Counter]]
            } else {
                PredecessorB[FatherBKeys[Counter]] = FatherB[FatherBKeys[Counter]]
            }
            Counter += 1
        }
        ResultantPopulation.push(MixPredecessors(PredecessorA, PredecessorB, Orders))
    }
    // console.log('<<<<<<<<<<<<<<<- Nueva Generacion ->>>>>>>>>>>>>>>')
    // console.log(ResultantPopulation)

    return ResultantPopulation
}

// ----------------------------------------------------------------------------------------------------------

function MixPredecessors(PredecessorA, PredecessorB, Orders)
{
    var JoinedPredecessor = {}
    var JoinedPredecessorKeys = []

    // Add the PredecessorAs to the Final predecessor object
    for(var AgentID in PredecessorA)
    {
        JoinedPredecessor[AgentID] = PredecessorA[AgentID]

        for(var OrderIndex = 0; OrderIndex < PredecessorA[AgentID].Orders.length; OrderIndex++){
            Orders = Orders.filter(e => e !== PredecessorA[AgentID].Orders[OrderIndex])
        }         
    }

    // Add the PredecessorAs to the Final predecessor object verifying that the orders don't repeat
    for(var AgentID in PredecessorB){
        for(var OrderIndex = 0; OrderIndex < PredecessorB[AgentID].Orders.length; OrderIndex++)
        {
            var ActualOrder = PredecessorB[AgentID].Orders[OrderIndex]

            if (Orders.includes(ActualOrder)){
                Orders = Orders.filter(e => e !== ActualOrder)
            }
            else {
                PredecessorB[AgentID].Orders = PredecessorB[AgentID].Orders.filter(e => e !== ActualOrder)
            }
        }
        JoinedPredecessor[AgentID] = PredecessorB[AgentID]         
    }

    // Distribute randomly the orders that were not in the cross
    JoinedPredecessorKeys = Object.keys(JoinedPredecessor)
    while(0 < Orders.length){            
        var AgentIndex = Utilities.getRandomArbitrary(0, JoinedPredecessorKeys.length)
        var OrderIndex = Utilities.getRandomArbitrary(0, Orders.length)
        
        if(JoinedPredecessor[JoinedPredecessorKeys[AgentIndex]].Agent.codes.includes(Orders[OrderIndex].code))
        {
            JoinedPredecessor[JoinedPredecessorKeys[AgentIndex]].Orders.push(Orders[OrderIndex])
            Orders = Orders.filter(e => e !== Orders[OrderIndex])
        }
    }
    return JoinedPredecessor
}

// ----------------------------------------------------------------------------------------------------------

function MutatePopulation(Population, PopulationSize, MutatePercentage, Orders)
{
    var NumberOfMutants = Math.ceil((MutatePercentage / 100) * Population.length)
    var NumberOfAgents = Object.keys(Population[0]).length
    var FatherA = {}
    var FatherB = {}
    var FatherAKeys = []
    var FatherBKeys = []
    var PredecessorA = {}
    var PredecessorB = {}
    var SliceIndex = Math.ceil(NumberOfAgents / 2)
    var Counter = 0
    var IndexToMute = []

    // Determine which individuals are going to be mutated
    while (NumberOfMutants > 0){
        IndexToMute.push(Utilities.getRandomArbitrary(0, PopulationSize))
        NumberOfMutants -= 1
    }

    for(var MutantIndex in IndexToMute){

        // Choose another father randomly
        FatherA = Population[MutantIndex]
        FatherB = Population[Utilities.getRandomArbitrary(0, Population.length)]
        FatherAKeys = Object.keys(FatherA)
        FatherBKeys = Object.keys(FatherB)


        Counter = 0        
        PredecessorA = {}
        PredecessorB = {}

        while (Counter < FatherAKeys.length - 1){
            if (Counter < SliceIndex){
                PredecessorA[FatherAKeys[Counter]] = FatherA[FatherAKeys[Counter]]
            } else {
                PredecessorB[FatherBKeys[Counter]] = FatherB[FatherBKeys[Counter]]
            }
            Counter += 1
        }
        Population[MutantIndex] = MixPredecessors(PredecessorA, PredecessorB, Orders)
    }
    // console.log("Mutados: " + Math.ceil((MutatePercentage / 100) * Population.length))
    // console.log('<<<<<<<<<<<<<<<- Población Mutada ->>>>>>>>>>>>>>>')
    // console.log(Population)

    return Population
}


