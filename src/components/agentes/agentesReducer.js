import * as Acciones from '../../assets/actions'
import * as Speech from '../../assets/speech'

const DEFAULT_STATE = {
    data:[],
    filtro:"",
    loading:false,
    pageSize:25,
    currentPage:1,
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
        case Acciones.CHANGE_PAGE_AGENTES:
            if(action.data<=state.data.length/state.pageSize && action.data>0){
                if(action.dispatcher){Speech.Speech(Speech.oK)}
                return{
                    ...state,
                    currentPage: action.data,
                }
            }
            Speech.Speech(Speech.wrongIndex)
            return state
        default:
            return state
    }

}

export default agentesReducer