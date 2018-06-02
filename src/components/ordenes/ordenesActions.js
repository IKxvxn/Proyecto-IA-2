import * as Acciones from '../../assets/actions'
import * as Generador from "../../assets/generator"
import * as Analysis from "../../assets/dataAnalysis"
var parser = require('xml2json-light');
const ordenes = require('../../data/ordenesXML.xml')


export function cargarOrdenes(){
    return function (dispatch) {
        dispatch({
          type: Acciones.CARGAR_ORDENES_REQUEST
        })

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(Object.values(parser.xml2json(this.responseText).root))
            const ordenes = Analysis.analysisOrdenes(Object.values(parser.xml2json(this.responseText).root))

            if(ordenes[1].length!=0){
                dispatch({
                    type: Acciones.CARGAR_ORDENES_FAILURE,
                    data: ordenes
                })
            }
            else{
                dispatch({
                    type: Acciones.CARGAR_ORDENES_SUCCESS,
                    data: ordenes[0]
                })
            }
        }};

        xhttp.open("GET", ordenes, true);
        xhttp.send();
    }
}


export const actualizarFiltro = (filtro) => ({
    type: Acciones.CHANGE_FILTRO_ORDENES,
    data: filtro
})

export const actualizarPage = (page,dispatcher) => ({
    type: Acciones.CHANGE_PAGE_ORDENES,
    data: page,
    dispatcher: dispatcher
})
