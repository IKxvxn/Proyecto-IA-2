import React, { Component } from 'react';
import { List, Avatar, Row, Col, Icon } from 'antd';
import * as Codes from '../../assets/codes'

class distribucionSubList extends Component {
  
  render() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.props.ordenes}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar style={{background:"#001529"}} size="large" icon={item.code[0]==="R"?"tool":"setting"} />}
              title={<span>{item.id}</span>}
              description={<Row type="flex" justify="start">
                <Col span={7}>Cliente: {item.name}</Col>
                <Col span={3}>Horas: {Codes.getHoras(item.code)}</Col>
                <Col span={3}>Comisión: ${Codes.getComision(item.code)}</Col>
              </Row>}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default distribucionSubList;