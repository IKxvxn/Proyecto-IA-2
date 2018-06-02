import * as Acciones from '../../assets/actions'
import * as Speech from '../../assets/speech'

const DEFAULT_STATE = {
    data:[],
    filtro:"",
    loading:false,
    pageSize:25,
    currentPage:1,
    expandedRowKeys:[]
}

const distribucionReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case Acciones.CARGAR_DISTRIBUCION_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case Acciones.CARGAR_DISTRIBUCION_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
            }
        case Acciones.CARGAR_DISTRIBUCION_FAILURE:
            return {
                ...state,
                loading: false,
                data: action.data[0],
            }
        case Acciones.CHANGE_FILTRO_DISTRIBUCION:
            return {
                ...state,
                filtro: action.data,
            }
        case Acciones.CHANGE_PAGE_DISTRIBUCION:
            if(action.data===state.currentPage){if(action.dispatcher){Speech.Speech(Speech.alreadyOnPage)};return state}
            if(action.data<=Math.ceil(state.data.length/state.pageSize) && action.data>0){
                if(action.dispatcher){Speech.Speech(Speech.oK)}
                return{
                    ...state,
                    currentPage: action.data,
                }
            }
            if(action.dispatcher){Speech.Speech(Speech.wrongIndex)}
            return state
        case Acciones.ADD_EXPANDED_ROW_DISTRIBUCION:
            if(state.expandedRowKeys.includes(action.data)){if(action.dispatcher){Speech.Speech(Speech.alreadyExpanded)};return state}
            if(action.data>state.data.length){if(action.dispatcher){Speech.Speech(Speech.wrongRowIndex)};return state}
            if(action.dispatcher){Speech.Speech(Speech.oK)}
            return{
                ...state,
                expandedRowKeys:[...state.expandedRowKeys,action.data]
            }
        case Acciones.REMOVE_EXPANDED_ROW_DISTRIBUCION:
            if(action.data>state.data.length){if(action.dispatcher){Speech.Speech(Speech.wrongRowIndex)};return state}
            if(!state.expandedRowKeys.includes(action.data)){if(action.dispatcher){Speech.Speech(Speech.notExpanded)};return state}
            if(action.dispatcher){Speech.Speech(Speech.oK)}
            return{
                ...state,
                expandedRowKeys:state.expandedRowKeys.map(value => {if(value!=action.data){return value}})
            }
        case Acciones.ALL_EXPANDED_ROW_DISTRIBUCION:
            var u=0; for(var i in state.expandedRowKeys){if(state.expandedRowKeys[i]!==undefined){u+=1}}  
            var Allrows = [...state.data.keys()];Allrows.push(state.data.length)
            if(u===Allrows.length){if(action.dispatcher){Speech.Speech(Speech.alreadyShowingAll)};return state}
            if(action.dispatcher){Speech.Speech(Speech.oK)}
            return{
                ...state,
                expandedRowKeys:Allrows
            }
        case Acciones.NONE_EXPANDED_ROW_DISTRIBUCION:
            if(state.expandedRowKeys.length===0){if(action.dispatcher){Speech.Speech(Speech.alreadyShowingAll)};return state}
            if(action.dispatcher){Speech.Speech(Speech.oK)}
            return{
                ...state,
                expandedRowKeys:[]
            }
        default:
            return state
    }

}

export default distribucionReducer