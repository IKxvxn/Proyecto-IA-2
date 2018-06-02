import * as Acciones from '../../assets/actions'
import * as Speech from '../../assets/speech'

const DEFAULT_STATE = {
    data:[],
    filtro:"",
    loading:false,
    pageSize:25,
    currentPage:1,
}

const ordenesReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case Acciones.CARGAR_ORDENES_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case Acciones.CARGAR_ORDENES_SUCCESS:
            return {
                ...state,
                loading: false,
                currentPage:1,
                data: action.data,
            }
        case Acciones.CARGAR_ORDENES_FAILURE:
            return {
                ...state,
                loading: false,
                data: action.data[0]
            }
        case Acciones.CHANGE_FILTRO_ORDENES:
            return {
                ...state,
                filtro: action.data,
            }
        case Acciones.CHANGE_PAGE_ORDENES:
            if(action.data<=Math.ceil(state.data.length/state.pageSize) && action.data>0){
                if(action.data===state.currentPage){if(action.dispatcher){Speech.Speech(Speech.alreadyOnPage)};return state}
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

export default ordenesReducer