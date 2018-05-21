export const apagarEntities = ["apagar","adiós"] 
export const irEntities = ["llévame","vamos","ver"]
export const nameEntities = ["cómo te llamas","cuál es tu nombre","dime tu nombre","cómo te llaman"]
export const cargarEntities = ["obtener","actualizar","cargar"]
export const datosEntities = ["datos","información","tabla"]
export const menu = ["menú"]
export const colapsar = ["colapsar","cerrar","reducir"]
export const expandir = ["expandir", "abrir", "aumentar"]
export const asistente = ["asistente"]
export const locations = ["agentes","a gentes","órdenes", "distribución", "asistente"]

export function containsAny(str, substrings) {
  for (var i = 0; i !== substrings.length; i++) {
     var substring = substrings[i];
     if (str.indexOf(substring) !== - 1) {
       return substring;
     }
  }
  return null; 
}
