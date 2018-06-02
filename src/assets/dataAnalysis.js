import * as Codes from './codes'
const codes = Object.keys(Codes.servicios)

const missingID = "El ID no fue especificado"
const missingName = "El nombre no fue especificado"
const missingCode = "El código no fue especificado"
const errorCode = "El código de servicio es inválido"

export function analysisAgentes(data){
    var goodRows = []
    var badRows = []

    for(var i in data){
        if(typeof(data[i].codes)==="string"){data[i].codes=[data[i].codes]}

        if(data[i].id===undefined){badRows.push({key:i,error:missingID})}
        else if(data[i].name===undefined){badRows.push({key:i,error:missingName})}
        else if(data[i].codes===undefined){badRows.push({key:i,error:missingCode})}
        else if(verifyCode(data[i].codes)===-1){badRows.push({key:i,error:errorCode})}
        else{goodRows.push(data[i])}
    }
    return [goodRows,badRows]
}

export function analysisOrdenes(data){
    var goodRows = []
    var badRows = []

    for(var i in data){
        if(data[i].id===undefined){badRows.push({key:i,error:missingID})}
        else if(data[i].name===undefined){badRows.push({key:i,error:missingName})}
        else if(data[i].code===undefined){badRows.push({key:i,error:missingCode})}
        else if(verifyCode([data[i].code])===-1){badRows.push({key:i,error:errorCode})}
        else{goodRows.push(data[i])}
    }
    return [goodRows,badRows]
}

function verifyCode(data){
    for(var i in data){
        if(!codes.includes(data[i])){return -1}
    }
    return 1
}