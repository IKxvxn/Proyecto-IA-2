import React, { Component } from 'react';
import { Table, Icon, Row, Col } from 'antd';
import * as Codes from './codes'

export const agenteColumns = [{
    title: 'ID',
    dataIndex: 'id',
    width: "18rem",
  }, {
    title: 'Agente',
    dataIndex: 'name',
  }, {
    title: 'Códigos',
    dataIndex: 'codes',
    width: "21.5625rem",
    render: array => <Row type="flex" justify="start">{array.map(function(text){return <Col span={1} className={"codeFormat"}><Icon style={{fontWeight:200}}type={text[0]==="R"?"tool":"setting"} /> {text}</Col>})}</Row>,
  }];

export const ordenesColumns = [{
    title: 'ID',
    dataIndex: 'id',
    width: "18rem",
  }, {
    title: 'Cliente',
    dataIndex: 'name',
  }, {
    title: 'Código',
    dataIndex: 'code',
    width: "5rem",
    render: text => <Row type="flex" justify="start"><Col className={"codeFormat"}><Icon style={{fontWeight:200}}type={text[0]==="R"?"tool":"setting"} /> {text}</Col></Row>,
  }];

  export const distribucionColumns  = [{
    title: '#',
    dataIndex: 'key',
    width: "7.4rem",
  },{
    title: 'ID',
    dataIndex: 'id',
    width: "7.4rem",
  },{
    title: 'Agente',
    dataIndex: 'name',
  },{
    title: 'Órdenes',
    dataIndex: 'ordenes',
    width: "8rem",
    render: ordenes => <Row type="flex" justify="start">{ordenes.length}</Row>
  },{
    title: 'Horas',
    dataIndex: 'ordenes',
    width: "8rem",
    render: ordenes => <Row type="flex" justify="start">{Codes.calcularHoras(ordenes)}</Row>
  },{
    title: 'Comisión',
    dataIndex: 'ordenes',
    width: "8rem",
    render: ordenes => <Row type="flex" justify="start">{"$"+Codes.calcularComision(ordenes)}</Row>
  }]

  export const ayudaNormalColumns = [{
    title: '',
    dataIndex: 'objeto',
    width: "1.5rem"
  }, {
    title: '',
    dataIndex: 'descripcion',
  }];

  export const ayudaSingleColumns = [{
    title: '',
    dataIndex: 'descripcion',
  }];

  export const errorNormalColumns = [{
    title: 'Fila',
    dataIndex: 'key',
    width: "3rem"
  }, {
    title: 'Descripción del error',
    dataIndex: 'error',
  }];
