export const servicios = {
    ICE:{
        servicio:"Instalación de cocina eléctrica",
        comision:250,
        horas:2
    },
    ICG:{
        servicio:"Instalación de cocina de gas",
        comision:400,
        horas:4
    },
    ILA:{
        servicio:"Instalación de lavadora automática",
        comision:200,
        horas:1
    },
    RCE:{
        servicio:"Reparación de cocina eléctrica",
        comision:300,
        horas:4
    },
    RCG:{
        servicio:"Reparación de cocina de gas",
        comision:500,
        horas:6
    },
    RCE:{
        servicio:"Reparación de lavadora automática",
        comision:250,
        horas:6
    },
}

export function calcularComision(array){
    var comision = 0
    for(var i in array){
        comision += servicios[array[i].code].comision
    }
    return comision
}

export function calcularHoras(array){
    var horas = 0
    for(var i in array){
        horas += servicios[array[i].code].horas
    }
    return horas
}

export function getHoras(code){
    return servicios[code].horas
}

export function getComision(code){
    return servicios[code].comision
}
