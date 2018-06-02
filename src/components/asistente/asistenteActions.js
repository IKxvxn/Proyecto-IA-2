import * as Acciones from '../../assets/actions'

export const cambiarEstadoAsistente = () => ({
    type: Acciones.CHANGE_ASISTENTE_STATE
})

export const cambiarEstadoAyuda = () => ({
    type: Acciones.CHANGE_AYUDA_STATE
})

export const cambiarEstadoNotificaciones = () => ({
    type: Acciones.CHANGE_NOTIFICACIONES_STATE
})


export const cambiarEstadoSpeaking = () => ({
    type: Acciones.CHANGE_SPEAKING_STATE
})

export const cambiarEstadoThinking = () => ({
    type: Acciones.CHANGE_THINKING_STATE
})

export const showAyudaModal = () => ({
    type: Acciones.SHOW_AYUDA_MODAL
})

export const hideErrorModal = () => ({
    type: Acciones.HIDE_ERROR_MODAL
})

export const hideAyudaModal = () => ({
    type: Acciones.HIDE_AYUDA_MODAL
})


export const changeAyudaTab = (tab) => ({
    type: Acciones.CHANGE_AYUDA_TAB,
    data: tab
})