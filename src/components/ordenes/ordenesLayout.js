import React, { Component } from 'react';
import { Table , Icon, Col, Row} from 'antd';
import * as Generador from "../../assets/generator"

const columns = [{
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

const data = Generador.generarOrdenes(100)

class ordenesLayout extends Component {
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} size="small"  pagination={false} scroll={{ x: '900px',y:"70vh"}}/>
      </div>
    );
  }
}

export default ordenesLayout;
