import { Form, Icon, Input, Button, Row, Col } from 'antd';
import React, { Component } from 'react';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} style={{margin:"-1rem 0"}}>
        <FormItem>
          {getFieldDecorator('userName')(
            <Row type="flex" justify="space-around">
              <Col xs={24} md={19}><Input value={this.props.value} onChange={(target)=>this.props.actualizarFiltro(target.target.value)} prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Criterio de búsqueda" /></Col>
              <Col xs={24} md={5}><Button type="primary" onClick={this.props.handleButtonAction} style={{width:"100%"}}><Icon type={this.props.modo===1?"pie-chart":"profile"} />{this.props.modo===1?"Distribuir":"Cargar"}</Button></Col>
            </Row>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);
