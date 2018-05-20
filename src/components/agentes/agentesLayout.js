import React, { Component } from 'react';
import { Table, Icon, Row, Col } from 'antd';
import * as Generador from "../../assets/generator"

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

const data = Generador.generarAgentes(20);


class agentesLayout extends Component {
  
  render() {
    return (
      <Table  columns={columns} dataSource={data} size="small"  pagination={false} scroll={{ x: '900px',y:"70vh"}}/>
    );
  }
}

export default agentesLayout;
