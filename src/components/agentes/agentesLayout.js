import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Icon, Row, Col } from 'antd';
import SearchBar from "../home/generalSearchBar"
import * as agentesActions from './agentesActions'
import * as Columnas from '../../assets/tables'

var JsSearch = require('js-search');
var busqueda = new JsSearch.Search('key');
busqueda.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();

busqueda.addIndex('codes');
busqueda.addIndex('id');
busqueda.addIndex('name');

class agentesLayout extends Component {
  
  render() {
    busqueda.addDocuments(this.props.estadoAgentes.data)
    return (
      <div>
        <SearchBar 
          modo={0} 
          actualizarFiltro={this.props.actualizarFiltro} 
          value={this.props.estadoAgentes.filtro} 
          handleButtonAction={this.props.cargarAgentes}/>
        <Table 
          style={{marginBottom:"-2rem"}} 
          columns={Columnas.agenteColumns} 
          loading={this.props.estadoAgentes.loading} 
          dataSource={this.props.estadoAgentes.filtro===""?this.props.estadoAgentes.data:busqueda.search(this.props.estadoAgentes.filtro)} 
          size="small"  
          pagination={{ pageSize: this.props.estadoAgentes.pageSize, current:this.props.estadoAgentes.currentPage, onChange:(page)=>this.props.actualizarPage(page) }}  
          scroll={{ x: '900px',y:"66.5vh"}}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    estadoAgentes: state.agentesReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cargarAgentes: ()  => dispatch(agentesActions.cargarAgentes()),
    actualizarFiltro: (filtro)  => dispatch(agentesActions.actualizarFiltro(filtro)),
    actualizarPage: (page)  => dispatch(agentesActions.actualizarPage(page)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(agentesLayout)
