import * as Acciones from '../../assets/actions'

const DEFAULT_STATE = {
    data:[],
    filtro:"",
    loading:false,

}

const agentesReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case Acciones.CARGAR_AGENTES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case Acciones.CARGAR_AGENTES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
            }
        case Acciones.CARGAR_AGENTES_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
            }
        case Acciones.CHANGE_FILTRO_AGENTES:
            return {
                ...state,
                filtro: action.data,
            }
        default:
            return state
    }

}

export default agentesReducer