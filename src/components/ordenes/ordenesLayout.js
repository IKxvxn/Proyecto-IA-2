import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table , Icon, Col, Row} from 'antd';
import SearchBar from "../home/generalSearchBar"
import * as ordenesActions from './ordenesActions'
import * as Generador from "../../assets/generator"
import * as Columnas from '../../assets/tables'

var JsSearch = require('js-search');
var busqueda = new JsSearch.Search('key');
busqueda.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();

busqueda.addIndex('code');
busqueda.addIndex('id');
busqueda.addIndex('name');

class ordenesLayout extends Component {
  render() {
    busqueda.addDocuments(this.props.estadoOrdenes.data)
    return (
      <div>
        <SearchBar 
          modo={0} 
          actualizarFiltro={this.props.actualizarFiltro} 
          loading={this.props.estadoOrdenes.loading} 
          value={this.props.estadoOrdenes.filtro} 
          handleButtonAction={this.props.cargarOrdenes}/>
        <Table 
          style={{marginBottom:"-2rem"}} 
          columns={Columnas.ordenesColumns} 
          loading={this.props.estadoOrdenes.loading} 
          dataSource={this.props.estadoOrdenes.filtro===""?this.props.estadoOrdenes.data:busqueda.search(this.props.estadoOrdenes.filtro)}
          pagination={{ pageSize: this.props.estadoOrdenes.pageSize, current:this.props.estadoOrdenes.currentPage, onChange:(page)=>this.props.actualizarPage(page) }}  
          scroll={{ x: '900px',y:"66.5vh"}}
          size="small" 
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    estadoOrdenes: state.ordenesReducer,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cargarOrdenes: ()  => dispatch(ordenesActions.cargarOrdenes()),
    actualizarFiltro: (filtro)  => dispatch(ordenesActions.actualizarFiltro(filtro)),
    actualizarPage: (page)  => dispatch(ordenesActions.actualizarPage(page)),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ordenesLayout)

