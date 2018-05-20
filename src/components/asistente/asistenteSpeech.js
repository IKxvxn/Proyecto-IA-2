export const Init = "Ahora podré ayudarte en lo que necesites"
export const End = "Adiós, fue un placer"
export const NotFount = "No te entendí, prueba diciendo AYUDA"
export const name = "Me llamo asistente, mucho gusto"

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
