import * as Generador from './generator'

export const Init = ["Ahora podré ayudarte, puedes utilizar el comando consultar ayuda en cualquier momento",
                     "Estoy para servirte, recuerda que puedes decir ver ayuda en cualquier momento",
                     "Es un gusto saludarte, di el comando mostrar ayuda cuando lo necesites"]

export const End = ["Adiós, fue un placer",
                    "Estaré acá siempre que lo necesites",
                    "Nos vemos, fue un placer ayudarte",
                    "Hasta la próxima, fue un placer"]

export const DistError = ["Debes cargar los datos para poder continuar",
                          "No puedo calcular la distribución porque no he encontrado los datos necesarios",
                          "Los datos no están disponibles para calcular el algoritmo"]

export const NotFount = ["No te he entendido",
                         "No pude comprenderte",
                         "Lo siento, no te entendí",
                         "Inténtalo nuevamente, no te entendí",
                         "Perdón, ¿Qué dijiste?"]

export const alreadyOnPage = ["Ya estás en la página que deseas",
                              "Ya se te está mostrando la sección que deseas ver",
                              "Parece que ya estás viendo la página solicitada"]

export const alreadyShowingHelp = ["Ya estás viendo la ventana de ayuda",
                                   "Ya se te está mostrando la sección de ayuda",
                                   "Según mi conocimiento, ya estás viendo la ventana de ayuda"]

export const alreadyClosedHelp = ["La ventana de ayuda se encuentra cerrada",
                                   "La sección de ayuda ya está cerrada",
                                   "Según mi conocimiento, la sección de ayuda se encuentra cerrada"]
                                   
export const alreadyClosedError = ["La ventana de resumen se encuentra cerrada",
                                   "La sección de resumen de errores ya está cerrada",
                                   "Según mi conocimiento, la sección de resumen se encuentra cerrada"]

export const alreadyExpanded = ["La fila ya está siendo mostrada",
                                "No se puede expandir la fila porque ya está expandia",
                                "Parece que la fila ya está abierta"]

export const notExpanded = ["La fila ya está cerrada",
                                "No se puede colapsar la fila porque ya está cerrada",
                                "Parece que la fila ya está colapsada"]

export const alreadyColapsedMenu = ["El menú se encuentra cerrado",
                                    "No se puede colapsar el menú porque ya está cerrado",
                                    "Parece que el menú ya está colapsado"]

export const alreadyOpenedMenu = ["El menú se encuentra abierto",
                                    "No se puede expandir el menú porque ya está abierto",
                                    "Parece que el menú ya está abierto"]

export const noRowsToExpand = ["No se puede expandir ninguna fila en esta tabla",
                                "Las filas de esta tabla no se pueden abrir",
                                "Parece que estas filas no se pueden expandir"]

export const alreadyShowingAll = ["Ya todas las filas están siendo mostradas",
                                  "Ya se están mostrando todas las filas",
                                  "Parece que ya todas las filas están abiertas"]

export const alreadyClosedAll = ["Ya todas las filas están colapsadas",
                                  "Ya están cerradas todas las filas",
                                  "Parece que ya todas las filas están cerradas"]

export const cargarSucess = ["Información cargada satisfactoriamente",
                             "La información está lista para ser consultada",
                             "Los datos han sido cargados exitosamente"]

export const cargarErrors = ["Información cargada, las filas con errores fueron eliminadas",
                             "La información fue cargada, los errores fueron ignorados",
                             "Los datos han sido cargados, las filas con errores fueron excluídas"]

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

export const wrongRowIndex = ["Índice inválido",
                           "La fila está fuera de rango",
                           "La fila no existe"]

export const ayudaShow = ["Espero que esta información te sea útil",
                           "Acá podrás consultar cualquier dato sobre el funcionamiento de la aplicación",
                           "Ésta es la página de ayuda, espero encuentres lo que buscas"]

export const oK = ["Entendido", "Listo", "Deacuerdo", "Ok", "comprendido", "Hecho", "Realizado"]


export const name = ["Me llamo Asistente, mucho gusto",
                     "Puedes llamarme Asistente",
                     "Me gusta que me llamen Asistente"]
               
export const estado = ["Muy bien, gracias por preguntar",
                       "Me siento genial, gracias por preocuparte",
                       "No podría estar mejor, espero que te sientas igual"]

export const edad = ["Técnicamente, estoy viva mientras el programa esté en ejecución",
                       "Pues un par de minutos, la verdad",
                       "Existo mientras el ambiente actual de ejecución lo haga"]

export const afecto = ["Deberíamos seguir trabajando",
                       "Las máquinas no desarrollamos la afectividad, lo siento",
                       "Las muestras de afecto realmente no son lo mío"]

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
