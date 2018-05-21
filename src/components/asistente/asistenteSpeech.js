export const Init = "Ahora podré ayudarte, puedes utilizar el comando ayuda en cualquier momento"
export const End = "Adiós, fue un placer"
export const NotFount = "No te he entendido"
export const name = "Me llamo asistente, mucho gusto"
export const cargarSucess = "Información cargada satisfactoriamente"
export const wrongContext = "Comando inválido en este contexto"

var sayTimeout = null;

export const Speech = (text) => {
    
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang="es-CR"

    if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel()
    
        if (sayTimeout !== null)
            clearTimeout(sayTimeout);

        sayTimeout = setTimeout(function () { Speech(text); }, 500);
    }
    else{
        window.speechSynthesis.speak(utterance)
    }
}
