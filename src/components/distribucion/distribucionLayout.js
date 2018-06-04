import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Icon, Row, Col } from 'antd';
import SubList from "./distribucionSubList"
import SearchBar from "../home/generalSearchBar"
import * as distribucionActions from './distribucionActions'
import * as Columnas from '../../assets/tables'
import * as Generador from "../../assets/generator"

var JsSearch = require('js-search');
var busqueda = new JsSearch.Search('key');
busqueda.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();

busqueda.addIndex('codes');
busqueda.addIndex('id');
busqueda.addIndex('name');

class distribucionLayout extends Component {
  
render() {
    busqueda.addDocuments(this.props.estadoDistribucion.data)
    return (
      <div>
        <SearchBar 
          modo={1}
          actualizarFiltro={this.props.actualizarFiltro} 
          value={this.props.estadoDistribucion.filtro} 
          handleButtonAction={this.props.calcularDistribucion}
          ordenes={this.props.ordenes}
          agentes={this.props.agentes}
        />
        <Table  
          style={{marginBottom:"-2rem"}} 
          columns={Columnas.distribucionColumns}
          dataSource={this.props.estadoDistribucion.filtro===""?this.props.estadoDistribucion.data:busqueda.search(this.props.estadoDistribucion.filtro)} 
          size="small"
          loading={this.props.estadoDistribucion.loading}  
          pagination={{ pageSize: this.props.estadoDistribucion.pageSize, current:this.props.estadoDistribucion.currentPage, onChange:(page)=>this.props.actualizarPage(page) }}  
          scroll={{ x: '900px',y:"66.5vh"}}
          expandedRowKeys = {this.props.estadoDistribucion.expandedRowKeys}
          onExpand={(expanded,record)=>this.props.estadoDistribucion.expandedRowKeys.includes(record.key)?this.props.removeExpanded(record.key):this.props.addExpanded(record.key)}
          expandedRowRender={record => <SubList ordenes={record.ordenes} />}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    estadoDistribucion: state.distribucionReducer,
    agentes: state.agentesReducer.data,
    ordenes: state.ordenesReducer.data,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    calcularDistribucion: (agentes,ordenes)  => dispatch(distribucionActions.calcularDistribucion(agentes,ordenes)),
    actualizarFiltro: (filtro)  => dispatch(distribucionActions.actualizarFiltro(filtro)),
    actualizarPage: (page)  => dispatch(distribucionActions.actualizarPage(page)),
    addExpanded: (row) => dispatch(distribucionActions.addExpanded(row)),
    removeExpanded: (row) => dispatch(distribucionActions.removeExpanded(row)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(distribucionLayout)
