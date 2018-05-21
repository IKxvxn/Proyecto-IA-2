import * as Acciones from '../../assets/actions'
import * as Speech from './asistenteSpeech'


const DEFAULT_STATE = {
    activo:false,
    speaking:true,
    thinking:false,
}

const asistenteReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case Acciones.CHANGE_ASISTENTE_STATE:
            if (!state.activo){
                Speech.Speech(Speech.Init)
            }
            else{
                Speech.Speech(Speech.End)
            }
            return {
                ...state,
                activo: !state.activo,
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
        case Acciones.CARGAR_AGENTES_SUCCESS:
            if(state.activo===true){Speech.Speech(Speech.cargarSucess)}
        default:
            return state
    }

}

export default asistenteReducer