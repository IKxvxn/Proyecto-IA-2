import React, { Component } from 'react';
import { Table, Icon, Row, Col } from 'antd';

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