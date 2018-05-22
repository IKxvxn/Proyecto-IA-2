import React, { Component } from 'react';
import { Table, Icon, Row, Col } from 'antd';
import SubList from "./distribucionSubList"
import SearchBar from "../home/generalSearchBar"
import * as Columnas from '../../assets/tables'
import * as Generador from "../../assets/generator"

var data = Generador.generarAgentes(100);
var data = data.map((field)=>{field.ordenes=Generador.generarOrdenes(Math.floor(Math.random() * (5 - 1) + 1));return field})

class distribucionLayout extends Component {
  
render() {
    return (
      <div>
        <SearchBar modo={1} />
        <Table  style={{marginBottom:"-2rem"}} columns={Columnas.distribucionColumns} dataSource={data} size="small"  pagination={{ pageSize: 25 }}  scroll={{ x: '900px',y:"66.5vh"}}
          expandedRowRender={record => <SubList ordenes={record.ordenes}/>}
        />
      </div>
    );
  }
}

export default distribucionLayout;