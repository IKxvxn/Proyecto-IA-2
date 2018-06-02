import React, { Component } from 'react';
import { Icon, Row, Col, Pagination, Table, Input, Select  } from 'antd';
import * as Style from '../style/styleHomeLayout'
import * as Rec from './recognition'
import '../style/asistenteDisplayer.css'

const Option = Select.Option;
const Search = Input.Search;

export const simbologiaAyuda = [
    {key:1, objeto:<Icon type="question-circle" />, descripcion:"Abre la ventana de ayuda"},
    {key:2, objeto:<Icon type="layout" />, descripcion:"Información acerca de la distribución de la interfaz"},
    {key:3, objeto:<Icon type="share-alt" />, descripcion:"Información sobre la iconografía de la aplicación"},
    {key:4, objeto:<Icon type="message" />, descripcion:"Información de los comandos de voz"},
]

export const simbologiaMenu = [
    {key:1, objeto:<Icon type="menu-unfold" />, descripcion:"Expande el menú"},
    {key:2, objeto:<Icon type="menu-fold" />, descripcion:"Colapsa el menú"},
]

export const simbologiaAsistente = [
    {key:1, objeto:<Icon type="minus" />, descripcion:"El asistente se encuentra apagado"},
    {key:2, objeto:<Icon type="sound" />, descripcion:"El asistente se encuentra hablando"},
    {key:3, objeto:<Icon type="eye-o" />, descripcion:"El asistente se encuentra escuchando"},
    {key:4, objeto:<Icon type="loading" />, descripcion:"El asistente se encuentra procesando"},
    {key:5, objeto:<Icon type="check-circle" />, descripcion:"La funcionalidad está activada"},
    {key:6, objeto:<Icon type="close-circle" />, descripcion:"La funcionalidad está desactivada"},
]

export const interfazMenu = [
    {key:1, descripcion:<Row type="flex" justify="space-between">
            <Col span={3}><Icon style={Style.exampleMenuItemNotFocused} type="copy" /></Col>
            <Col span={20}><Icon style={Style.exampleMenuItemNotFocused}><Icon type="copy" /> Órdenes</Icon></Col>
        </Row>},
    {key:2, descripcion:"Elemento de menú no seleccionado"},
    {key:3, descripcion:<Row type="flex" justify="space-between">
            <Col span={3}><Icon style={Style.exampleMenuItemFocused} type="copy" /></Col>
            <Col span={20}><Icon style={Style.exampleMenuItemFocused}><Icon type="copy" /> Órdenes</Icon></Col>
        </Row>},
    {key:4, descripcion:"Elemento de menú seleccionado"},
]

export const interfazAsistente = [
    {key:1, descripcion:<Row type="flex" justify="space-between">
            <Col span={3}><Icon style={Style.exampleAsistenteOff} type="minus" /></Col>
            <Col span={20}><Icon style={Style.exampleAsistenteOff} type="minus" /></Col>
        </Row>},
    {key:2, descripcion:"El asistente se encuentra apagado"},
    {key:3, descripcion:<Row type="flex" justify="space-between">
            <Col span={3}><Icon style={Style.exampleAsistenteOn} className="on" type="eye-o" /></Col>
            <Col span={20}><Icon style={Style.exampleAsistenteOn} className="on" type="eye-o" /></Col>
        </Row>},
    {key:4, descripcion:"El asistente se encuentra encendido y escuchando"},
]

export const interfazTabla = [
    {key:1, descripcion:<Row type="flex" justify="center"><Pagination defaultCurrent={3} total={50} /></Row>},
    {key:2, descripcion:"Selector de página de tabla"},
    {key:3, descripcion:<Row type="flex" justify="center">
        <Table  showHeader={false} size="small" columns={[]} dataSource={[{data:1}]}  pagination={false} expandedRowRender={record => <p/>}/>
    </Row>},
    {key:4, descripcion:"Expansor de fila de tabla"},
]

export const interfazComando = [
    {key:1, descripcion:<Row type="flex" justify="center">{selectGen(Rec.expandirVerbs)}</Row>},
    {key:2, descripcion:"Sección variable del comando. Cualquiera es válida"},
    {key:3, descripcion:<Row type="flex" justify="center">{selectGen(Rec.menuNouns)}</Row>},
    {key:4, descripcion:"Sección invariable del comando. Sólo una opción válida"},
]

export const interfazBusqueda = [
    {key:1, descripcion:<Row type="flex" justify="center"><Search placeholder="Criterio de búsqueda" style={{ width: "100%" }}/></Row>},
    {key:2, descripcion:"La búsqueda se realiza cada vez que el criterio cambia"},
]
export const comandoMenu = [
    {key:1, descripcion:
    <Row type="flex" justify="space-between" aling="center">
        <Col span={7} style={Style.comandoName}>Cambiar Página</Col>
        <Col span={16}> {selectGen(Rec.irVerbs)} + {selectGen(Rec.locationsNouns.slice(1))} </Col>
    </Row>
    },
    {key:2, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Expandir Menú</Col>
            <Col span={16}> {selectGen(Rec.expandirVerbs)} + {selectGen(Rec.menuNouns)} </Col>
        </Row>
        },
    {key:3, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Colapsar Menú</Col>
            <Col span={16}> {selectGen(Rec.colapsarVerbs)} + {selectGen(Rec.menuNouns)} </Col>
        </Row>
    },
]
export const comandoGeneral = [
    {key:1, descripcion:
    <Row type="flex" justify="space-between" aling="center">
        <Col span={7} style={Style.comandoName}>Abrir Ayuda</Col>
        <Col span={16}> {selectGen(Rec.openModalVerbs)} + {selectGen(Rec.ayudaNouns)} </Col>
    </Row>
    },
    {key:2, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Cerrar Ayuda</Col>
            <Col span={16}> {selectGen(Rec.closeModalVerbs)} + {selectGen(Rec.ayudaNouns)} </Col>
        </Row>
        },
    {key:3, descripcion:
    <Row type="flex" justify="space-between" aling="center">
        <Col span={7} style={Style.comandoName}>Ver Página Ayuda</Col>
        <Col span={16}> {selectGen(Rec.irVerbs)} + {selectGen(Rec.ayudalocationsNouns)}</Col>
    </Row>
    },
]

export const comandoResumen = [
    {key:1, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Cerrar Ayuda</Col>
            <Col span={16}> {selectGen(Rec.closeModalVerbs)} + {selectGen(Rec.resumenNouns)} </Col>
        </Row>
    },
]

export const comandoAsistente = [
    {key:1, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Apagar Asistente</Col>
            <Col span={16}> {selectGen(Rec.apagarVerbs)} + {selectGen(Rec.asistenteNouns)} </Col>
        </Row>
    },
]

export const comandoBusqueda = [
    {key:1, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Buscar Palabra</Col>
            <Col span={16}> {selectGen(Rec.buscarVerbs)} + {selectGen(["oración"])} </Col>
        </Row>
    },
    {key:2, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Limpiar Búsqueda</Col>
            <Col span={16}> {selectGen(Rec.limpiarVerbs)} + {selectGen(Rec.busquedaNouns)} </Col>
        </Row>
    },
]

export const comandoTablas = [
    {key:1, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Cargar Datos</Col>
            <Col span={16}> {selectGen(Rec.cargarVerbs)} + {selectGen(Rec.datosVerbs)} </Col>
        </Row>
    },
    {key:5, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Calcular Distribución</Col>
            <Col span={16}> {selectGen(Rec.calcularVerbs)} + {selectGen(Rec.distribucionNouns)} </Col>
        </Row>
    },
    {key:2, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Ir a Página #</Col>
            <Col span={16}> {selectGen(Rec.irVerbs)} + {selectGen(Rec.pageNouns)} + {selectGen(["#"])} </Col>
        </Row>
    },
    {key:3, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Ir a Página Siguiente</Col>
            <Col span={16}> {selectGen(Rec.irVerbs)} + {selectGen(Rec.pageNouns)} + {selectGen(Rec.siguienteNouns)} </Col>
        </Row>
    },
    {key:4, descripcion:
        <Row type="flex" justify="space-between" aling="center">
            <Col span={7} style={Style.comandoName}>Ir a Página  Anterior</Col>
            <Col span={16}> {selectGen(Rec.irVerbs)} + {selectGen(Rec.pageNouns)} + {selectGen(Rec.anteriorNouns)} </Col>
        </Row>
    },
]


function selectGen(list){
    if(list.length===1){return <span style={{border:"solid",borderWidth:"thin",borderColor:"grey", borderRadius:"15px", padding:"0.3rem 0.5rem"}}>{list[0]}</span>}
    return <Select style={{border:"solid",borderWidth:"thin",borderColor:"grey", borderRadius:"5px"}}defaultValue={list[0]}>{list.map(function(item){return <Option value={item}>{item}</Option>})}</Select> 
} 