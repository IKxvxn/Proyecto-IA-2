import * as Generador from './generator'

export const Init = ["Ahora podré ayudarte, puedes utilizar el comando ayuda en cualquier momento",
                     "Estoy para servirte, recuerda que puedes pedir ayuda en cualquier momento",
                     "Es un gusto saludarte, pide ayuda cuando lo necesites"]

export const End = ["Adiós, fue un placer",
                    "Estaré acá siempre que lo necesites",
                    "Nos vemos, fue un placer ayudarte",
                    "Hasta la próxima, fue un placer"]

export const NotFount = ["No te he entendido",
                         "No pude comprenderte",
                         "Lo siento, no te entendí",
                         "Inténtalo nuevamente, no te entendí",
                         "Perdón, ¿Qué dijiste?"]

export const name = ["Me llamo Asistente, mucho gusto",
                     "Puedes llamarme Asistente",
                     "Me gusta que me llamen Asistente"]

export const cargarSucess = ["Información cargada satisfactoriamente",
                             "La información está lista para ser consultada",
                             "Los datos han sido cargados exitosamente"]

export const wrongContext = ["Comando inválido en este contexto",
                             "Lo siento, pero ese comando no puede ser utilizado aquí",
                             "El comando no está siendo utilizado en el contexto adecuado",
                             "Comando usado en un contexto erróneo"]

export const allwaysUp = ["La funcionalidad no se puede desactivar porque está siendo utilizada por mí",
                          "Necesito esta funcionalidad, lo siento",
                          "Necesito tener esta funcionalidad activa para brindarte una mejor experiencia"]

export const wrongIndex = ["Índice inválido",
                           "La página está fuera de rango",
                           "La página no existe"]

export const oK = ["Entendido", "Listo", "Deacuerdo", "Ok", "comprendido", "Hecho", "Realizado"]

var sayTimeout = null;

export const Speech = (textos) => {
    
    var utterance = new SpeechSynthesisUtterance(textos[Generador.getRandomArbitrary(0,textos.length)]);
    utterance.lang="es-CR"

    if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel()
    
        if (sayTimeout !== null)
            clearTimeout(sayTimeout);

        sayTimeout = setTimeout(function () { Speech(textos); }, 500);
    }
    else{
        window.speechSynthesis.speak(utterance)
    }
}
