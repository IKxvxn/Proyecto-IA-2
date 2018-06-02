import { message } from 'antd';
import * as Acciones from '../../assets/actions'
import * as Speech from '../../assets/speech'

message.config({
    top: 10,
    maxCount: 1,
  })

const DEFAULT_STATE = {
    estadoAsistente:false,
    estadoNotificaciones:true,
    estadoAyuda:false,
    speaking:true,
    thinking:false,
    estadoAyudaModal:false,
    estadoErrorModal:false,
    currentTabAyuda:"simbología",
    errors:[]
}

const asistenteReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case Acciones.CHANGE_ASISTENTE_STATE:
            if (!state.estadoAsistente){
                Speech.Speech(Speech.Init)
            }
            else{
                Speech.Speech(Speech.End)
            }
            return {
                ...state,
                estadoAsistente: !state.estadoAsistente,
            }
        case Acciones.CHANGE_SPEAKING_STATE:
            return {
                ...state,
                speaking: !state.speaking,
            }
        case Acciones.CHANGE_THINKING_STATE:
            return {
                ...state,
                thinking: !state.thinking,
            }
        case Acciones.SHOW_AYUDA_MODAL:
            return{
                ...state,
                estadoAyudaModal:true
            }
        case Acciones.HIDE_AYUDA_MODAL:
            return{
                ...state,
                estadoAyudaModal:false
            }
        case Acciones.CARGAR_ORDENES_FAILURE:
        case Acciones.CARGAR_AGENTES_FAILURE:
            if(state.estadoAsistente===true){Speech.Speech(Speech.cargarErrors)}
            else if(state.estadoNotificaciones===true){message.warning(Speech.cargarErrors[0])}
            return{
                ...state,
                estadoErrorModal:true,
                errors:action.data[1]
            }
        case Acciones.HIDE_ERROR_MODAL:
            return{
                ...state,
                estadoErrorModal:false,
                errors:[]
            }
        case Acciones.CHANGE_AYUDA_TAB:
            return{
                ...state,
                estadoAyudaModal:true,
                currentTabAyuda:action.data
            }
        case Acciones.CHANGE_NOTIFICACIONES_STATE:
            if (state.estadoAsistente===true){
                Speech.Speech(Speech.allwaysUp)
            }
            else{
                return {
                    ...state,
                    estadoNotificaciones: !state.estadoNotificaciones,
                }  
            }
            return state
        case Acciones.CARGAR_DISTRIBUCION_SUCCESS:   
        case Acciones.CARGAR_ORDENES_SUCCESS:    
        case Acciones.CARGAR_AGENTES_SUCCESS:
            if(state.estadoAsistente===true){Speech.Speech(Speech.cargarSucess)}
            else if(state.estadoNotificaciones===true){message.success(Speech.cargarSucess[0])}
            return state
        default:
            return state
    }

}

export default asistenteReducer