import * as Acciones from '../../assets/actions'
import * as Generador from "../../assets/generator"
import * as Analysis from "../../assets/dataAnalysis"
import * as Algorithm from "../../assets/genetic"

export function calcularDistribucion(){ 

    var PopulationSize = 10
    var NAgents = 100
    var NOrders = 600
    var NGenerations = 100
    Algorithm.genetic(Generador.generarAgentes(NAgents), Generador.generarOrdenes(NOrders), NGenerations, PopulationSize)
    return function (dispatch) { 
        dispatch({ 
          type: Acciones.CARGAR_DISTRIBUCION_REQUEST 
        }) 
        dispatch({ 
            type: Acciones.CARGAR_DISTRIBUCION_SUCCESS, 
             data: Generador.generarAgentes(50).map((field)=>{field.ordenes=Generador.generarOrdenes(Math.floor(Math.random() * (5 - 1) + 1));return field})
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


