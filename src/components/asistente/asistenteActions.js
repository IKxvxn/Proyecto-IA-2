import * as Acciones from '../../assets/actions'

export const cambiarEstadoAsistente = () => ({
    type: Acciones.CHANGE_ASISTENTE_STATE
})

export const cambiarEstadoSpeaking = () => ({
    type: Acciones.CHANGE_SPEAKING_STATE
})

export const cambiarEstadoThinking = () => ({
    type: Acciones.CHANGE_THINKING_STATE
})