import React, { Component } from 'react';
import { Table, Icon, Row, Col } from 'antd';
import SubList from "./distribucionSubList"
import SearchBar from "../home/generalSearchBar"
import * as Codes from '../../assets/codes'
import * as Generador from "../../assets/generator"

const columns = [{
  title: 'ID',
  dataIndex: 'id',
  width: "14.8rem",
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


var data = Generador.generarAgentes(100);
var data = data.map((field)=>{field.ordenes=Generador.generarOrdenes(Math.floor(Math.random() * (5 - 1) + 1));return field})

class distribucionLayout extends Component {
  
render() {
    return (
      <div>
        <SearchBar modo={1} />
        <Table  columns={columns} dataSource={data} size="small"  pagination={false} scroll={{ x: '900px',y:"70vh"}}
          expandedRowRender={record => <SubList ordenes={record.ordenes}/>}
        />
      </div>
    );
  }
}

export default distribucionLayout;