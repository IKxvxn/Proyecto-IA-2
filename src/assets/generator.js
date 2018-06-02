import * as servicios from './codes'

const nombres=["Mateo","Santiago","Matías","Sebastián","Benjamín","Lucas","Thiago","Martín","Alejandro",
"Emiliano","Nicolás","Joaquín","Samuel","Diego","Dylan","Daniel","Leonardo","Maximiliano","Felipe",
"Gael","Liam","Bruno","Ian","Gabriel","Emmanuel","David","Adrián","Agustín","Hugo","Isaac","Bautista",
"Emilio","Pablo","Leo","Valentino","Dante","Julián","Erick","Aarón","Lorenzo","Manuel","Francisco",
"Noah","León","Vicente","Ángel","Rodrigo","Benicio","Íker","Luciano","Sofía","Isabella","Emma",
"Valentina","Victoria","Martina","Luciana","Camila","Lucía","Renata","Mía","Ximena","Valeria","Emilia",
"Olivia","Julieta","Elena","Sara","Catalina","Regina","Daniela","Samantha","Paula","Alma","Natalia",
"Mariana","María José","Antonella","María","Emily","Julia","Zoe","Ariana","Romina","Gabriela",
"Juana","Amanda","Abril","Aitana","Josefina","Abigail","Miranda","Antonia","Andrea","Fernanda","Chloe",
"Amelia","Alejandra","Lola","Francesca"]

const apellidos=["González","Muñoz","Rojas","Díaz","Pérez","Soto","Contreras","Silva","Martínez","Sepúlveda",
"Morales","Rodríguez","López","Fuentes","Hernández","Torres","Araya","Flores","Espinoza","Valenzuela",
"Castillo","Ramírez","Reyes","Gutiérrez","Castro","Vargas","Álvarez","Vásquez","Tapia","Fernández",
"Sánchez","Carrasco","Gómez","Cortés","Herrera","Núñez","Jara","Vergara","Rivera","Figueroa","Riquelme",
"García","Miranda","Bravo","Vera","Molina","Vega","Campos","Sandoval","Orellana","Zúñiga","Olivares",
"Alarcón","Gallardo","Ortiz","Garrido","Salazar","Guzmán","Henríquez","Saavedra","Navarro","Aguilera",
"Parra","Romero","Aravena","Pizarro","Godoy","Peña","Cáceres","Leiva","Escobar","Yáñez","Valdés","Vidal",
"Salinas","Cárdenas","Jiménez","Ruiz","Lagos","Maldonado","Bustos","Medina","Pino","Palma","Moreno",
"Sanhueza","Carvajal","Navarrete","Sáez","Alvarado","Donoso","Poblete","Bustamante","Toro","Ortega",
"Venegas","Guerrero","Paredes","Farías","SanMartín"]

var codes = Object.keys(servicios.servicios)

export function getRandomArbitrary(min, max) {
    return  Math.floor(Math.random() * (max - min) + min);
}

function shuffle(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}

export function generarAgentes(cantidad){
    var respuesta = []
    var ids = []
    
    while(cantidad!==0){
        var parcial={}
        parcial.key = cantidad

        while(true){
            parcial.id = getRandomArbitrary(1,8)+"0"+getRandomArbitrary(100,999)+"0"+getRandomArbitrary(100,999)
            if(!ids.includes(parcial.id)){
                ids.push(parcial.id)
                break;
            }
        }
        
        parcial.name = nombres[getRandomArbitrary(0,nombres.length)]+" "+apellidos[getRandomArbitrary(0,apellidos.length)]+" "+apellidos[getRandomArbitrary(0,apellidos.length)]
        parcial.codes = shuffle(codes).slice(0,getRandomArbitrary(1,codes.length+1))
        
        respuesta.push(parcial)

        cantidad-=1
    }

    return respuesta
}

export function generarOrdenes(cantidad){
    var respuesta = []
    var ids = []
    
    while(cantidad!==0){
        var parcial={}
        parcial.key = cantidad
        parcial.name = nombres[getRandomArbitrary(0,nombres.length)]+" "+apellidos[getRandomArbitrary(0,apellidos.length)]+" "+apellidos[getRandomArbitrary(0,apellidos.length)]
        parcial.code = shuffle(codes).slice(0,getRandomArbitrary(1,2))[0]
        
        while(true){
            parcial.id = parcial.code+"-"+getRandomArbitrary(100,999)+"-"+getRandomArbitrary(100,999)+"-"+getRandomArbitrary(100,999)
            if(!ids.includes(parcial.id)){
                ids.push(parcial.id)
                break;
            }
        }
        respuesta.push(parcial)

        cantidad-=1
    }
    
    return respuesta
}
