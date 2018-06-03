import * as Utilities from './generator'
import * as Codes from './codes'

// ----------------------------------------------------------------------------------------------------------

export function genetic(agentes, ordenes)
{
    var InitialPopulation = GenerateInitialPopulation(agentes, ordenes, 5)   
    
    // EstimateFitness(InitialPopulation[0])
    ExtractTopFitnessIndividuals(InitialPopulation, 3)
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

        // Distribute all the orders randomly between all the agents        
        while(OrdersCopy.length != 0){            
            
            var AgentIndex = Utilities.getRandomArbitrary(0, Agents.length)
            var OrderIndex = Utilities.getRandomArbitrary(0, OrdersCopy.length)
            
            if(Agents[AgentIndex].codes.includes(OrdersCopy[OrderIndex].code))
            {
                Individual[Agents[AgentIndex].key].Orders.push(OrdersCopy[OrderIndex])
                OrdersCopy = OrdersCopy.filter(e => e !== OrdersCopy[OrderIndex])
            }
        }
        Population.push(Individual)       
        Size -= 1
    }
    console.log('<<<<<<<<<<<<<<<- Poblacion Inicial ->>>>>>>>>>>>>>>')
    console.log(Population)

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

        while (Counter < AgentOrders.length){
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
    
    console.log(GeneralFitnessData)

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
    console.log("Fitness: " + ResultantFitness)
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
        TopFitness.push({"Index": Counter, "Fitness":EstimateFitness(Population[Counter])})
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
    console.log('<<<<<<<<<<<<<<<- Seleccion Natural ->>>>>>>>>>>>>>>')
    console.log(NaturalSelection)
    return NaturalSelection
}

// ----------------------------------------------------------------------------------------------------------

function SortArrayByField(Data, Prop, Asc) {
    var result  = Data.sort(function(a, b) {
        if (Asc) {
            return (a[Prop] > b[Prop]) ? 1 : ((a[Prop] < b[Prop]) ? -1 : 0);
        } else {
            return (b[Prop] > a[Prop]) ? 1 : ((b[Prop] < a[Prop]) ? -1 : 0);
        }
    });
    return result;
}