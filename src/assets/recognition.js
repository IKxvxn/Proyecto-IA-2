const numberPattern = /\d+/g;

export const apagarVerbs = ["apagar"] 
export const irVerbs = ["consultar","ver","mostrar"]
export const cargarVerbs = ["obtener","actualizar","cargar"]
export const buscarVerbs = ["buscar","filtrar"]
export const datosVerbs = ["datos","información","tabla"]
export const limpiarVerbs = ["borrar","limpiar","eliminar"]
export const colapsarVerbs = ["colapsar","cerrar","reducir"]
export const expandirVerbs = ["expandir", "abrir", "aumentar"]
export const openModalVerbs = ["ver","abrir","consultar","mostrar"]
export const closeModalVerbs = ["cerrar"]

export const menuNouns = ["menú"]
export const ayudaNouns = ["ayuda"]
export const siguienteNouns = ["siguiente","próxima"]
export const anteriorNouns = ["anterior","previa"]
export const numbersNouns = ["cero","uno","dos","tres","cuatro","cinco","seis","siete","ocho","nueve"]
export const pageNouns = ["página","sección"]
export const busquedaNouns = ["búsqueda","filtro"]
export const asistenteNouns = ["asistente"]
export const locationsNouns = ["a gentes","agentes","órdenes", "distribución", "asistente"]
export const ayudalocationsNouns = ["simbología","interfaz","comandos"]

export const nameQuestions = ["cómo te llamas","cuál es tu nombre","dime tu nombre","cómo te llaman"]

export function containsAny(str, substrings) {
  for (var i = 0; i !== substrings.length; i++) {
     var substring = substrings[i];
     if ( str===substring || str.indexOf(" "+substring+" ") !== - 1||str.indexOf(substring+" ") !== - 1||str.indexOf(" "+substring) !== - 1) {
       return substring;
     }
  }
  return null; 
}

export function getFirstNumber(str){
  var result = str.match( numberPattern )
  var number = null

  if (result===null){
     number = containsAny(str,numbersNouns)
  }
  if(number!==null){
    result = numbersNouns.indexOf(number)
  } 

  return result===null?undefined:parseInt(result[0])
}
