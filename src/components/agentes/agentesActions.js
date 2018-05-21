import * as Acciones from '../../assets/actions'
import * as Generador from "../../assets/generator"

export function cargarAgentes(){
    return function (dispatch) {
        dispatch({
          type: Acciones.CARGAR_AGENTES_REQUEST
        })
        dispatch({
            type: Acciones.CARGAR_AGENTES_SUCCESS,
            data: Generador.generarAgentes(20)
        })
    }
}

export const actualizarFiltro = (filtro) => ({
    type: Acciones.CHANGE_FILTRO_AGENTES,
    data: filtro
})
