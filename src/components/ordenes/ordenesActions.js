import * as Acciones from '../../assets/actions'
import * as Generador from "../../assets/generator"


export function cargarOrdenes(){
    return function (dispatch) {
        dispatch({
          type: Acciones.CARGAR_ORDENES_REQUEST
        })
        dispatch({
            type: Acciones.CARGAR_ORDENES_SUCCESS,
            data: Generador.generarOrdenes(100)
        })
    }
}

export const actualizarFiltro = (filtro) => ({
    type: Acciones.CHANGE_FILTRO_ORDENES,
    data: filtro
})

export const actualizarPage = (page,dispatcher) => ({
    type: Acciones.CHANGE_PAGE_ORDENES,
    data: page,
    dispatcher: dispatcher
})
