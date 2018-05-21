import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Icon, Row, Col } from 'antd';
import SearchBar from "../home/generalSearchBar"
import * as agentesActions from './agentesActions'

const columns = [{
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

class agentesLayout extends Component {
  
  render() {
    return (
      <div>
        <SearchBar modo={0} handleButtonAction={this.props.cargarAgentes}/>
        <Table  columns={columns} loading={this.props.estadoAgentes.loading} dataSource={this.props.estadoAgentes.data} size="small"  pagination={false} scroll={{ x: '900px',y:"70vh"}}/>
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
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(agentesLayout)
