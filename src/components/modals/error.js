import React, { Component } from 'react';
import { Modal, Button, } from 'antd';
import ErrorTable from './errorTable'
import * as Columns from '../../assets/tables'
import * as Style from '../../style/styleHomeLayout';

class App extends React.Component {
  render() {
    return (
      <div>
        <Modal
          visible={this.props.estadoErrorModal}
          title="Ventana de Resumen"
          style={{maxWidth:"38rem", top:75}}
          onCancel={this.props.hideErrorModal}
          footer={[
            <Button key="submit" type="primary" onClick={this.props.hideErrorModal}>
              Volver
            </Button>,
          ]}
        >
        <ErrorTable title="Errores encontrados" columns={Columns.errorNormalColumns} data={this.props.errors}/>
        </Modal>
      </div>
    );
  }
}

export default App