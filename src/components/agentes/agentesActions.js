import * as Acciones from '../../assets/actions'
import * as Generador from "../../assets/generator"
import * as Analysis from "../../assets/dataAnalysis"
var parser = require('xml2json-light');
const agentes = require('../../data/agentesXML.xml')

export function cargarAgentes(){
    return function (dispatch) {
        dispatch({
          type: Acciones.CARGAR_AGENTES_REQUEST
        })

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            const agentes = Analysis.analysisAgentes(Object.values(parser.xml2json(this.responseText).root))

            if(agentes[1].length!=0){
                dispatch({
                    type: Acciones.CARGAR_AGENTES_FAILURE,
                    data: agentes
                })
            }
            else{
                dispatch({
                    type: Acciones.CARGAR_AGENTES_SUCCESS,
                    data: agentes[0]
                })
            }
        }};

        xhttp.open("GET", agentes, true);
        xhttp.send();
    }
}

export const actualizarFiltro = (filtro) => ({
    type: Acciones.CHANGE_FILTRO_AGENTES,
    data: filtro
})

export const actualizarPage = (page,dispatcher) => ({
    type: Acciones.CHANGE_PAGE_AGENTES,
    data: page,
    dispatcher: dispatcher
})
