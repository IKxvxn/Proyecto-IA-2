import * as Acciones from '../../assets/actions'
import * as Generador from "../../assets/generator"
import * as Analysis from "../../assets/dataAnalysis"
import * as Algorithm from "../../assets/genetic"

export function calcularDistribucion(agentes, ordenes){ 

    var PopulationSize = 10
    var NGenerations = 100
    
    return function (dispatch) { 
        if(agentes.length===0 ||ordenes.length===0){dispatch({type:Acciones.CARGAR_DISTRIBUCION_FAILURE}); return}

        dispatch({ 
          type: Acciones.CARGAR_DISTRIBUCION_REQUEST 
        }) 
        
        var distribucion = Algorithm.genetic(agentes, ordenes, NGenerations, PopulationSize)
        var result = []
        for(var i in distribucion){
            distribucion[i].Agent.key=i
            distribucion[i].Agent.ordenes=distribucion[i].Orders
            result.push(distribucion[i].Agent)
        }

        dispatch({ 
            type: Acciones.CARGAR_DISTRIBUCION_SUCCESS, 
             data: result
            //data:  Algorithm.genetic(Generador.generarAgentes(NAgents), Generador.generarOrdenes(NOrders), NGenerations, PopulationSize)
        }) 
}}
export const actualizarFiltro = (filtro) => ({
    type: Acciones.CHANGE_FILTRO_DISTRIBUCION,
    data: filtro
})

export const addExpanded = (row,dispatcher) => ({
    type: Acciones.ADD_EXPANDED_ROW_DISTRIBUCION,
    data: row,
    dispatcher:dispatcher
})

export const removeExpanded = (row,dispatcher) => ({
    type: Acciones.REMOVE_EXPANDED_ROW_DISTRIBUCION,
    data: row,
    dispatcher:dispatcher
})

export const allExpanded = (dispatcher) => ({
    type: Acciones.ALL_EXPANDED_ROW_DISTRIBUCION,
    dispatcher:dispatcher
})

export const noneExpanded = (dispatcher) => ({
    type: Acciones.NONE_EXPANDED_ROW_DISTRIBUCION,
    dispatcher:dispatcher
})

export const actualizarPage = (page,dispatcher) => ({
    type: Acciones.CHANGE_PAGE_DISTRIBUCION,
    data: page,
    dispatcher: dispatcher
})


