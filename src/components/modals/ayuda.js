import React, { Component } from 'react';
import { Modal, Button, Icon, Tabs, Card } from 'antd';
import AyudaTable from './ayudaTable'
import * as Columns from '../../assets/tables'
import * as Style from '../../style/styleHomeLayout';
import * as AyudaData from '../../assets/ayuda'

const TabPane = Tabs.TabPane;

class App extends React.Component {
  render() {
    console.log(AyudaData.preguntas)
    return (
      <div>
        <Icon
            style={Style.trigger}
            type='question-circle'
            onClick={this.props.showAyudaModal}
        />
        <Modal
          visible={this.props.estadoAyudaModal}
          title="Venta de Ayuda"
          style={{minWidth:"38rem", top:25}}
          onCancel={this.props.hideAyudaModal}
          footer={[
            <Button key="submit" type="primary" onClick={this.props.hideAyudaModal}>
              Volver
            </Button>,
          ]}
        >
        <Tabs style={{marginTop:"-28px"}} onChange={(tab)=>this.props.changeAyudaTab(tab)} activeKey={this.props.currentTabAyuda}>
            <TabPane style={{maxHeight:"69vh", overflow:"auto"}} tab={<span><Icon type="share-alt" />Simbología</span>} key="simbología">
                <AyudaTable title="Ayuda" columns={Columns.ayudaNormalColumns} data={AyudaData.simbologiaAyuda}/>
                <AyudaTable title="Menú" columns={Columns.ayudaNormalColumns} data={AyudaData.simbologiaMenu}/>
                <AyudaTable title="Asistente" columns={Columns.ayudaNormalColumns} data={AyudaData.simbologiaAsistente}/>
            </TabPane>
            <TabPane style={{maxHeight:"69vh", overflow:"auto"}} tab={<span><Icon type="layout" />Interfaz</span>} key="interfaz">
                <AyudaTable title="Menú" columns={Columns.ayudaSingleColumns} data={AyudaData.interfazMenu}/>
                <AyudaTable title="Asistente" columns={Columns.ayudaSingleColumns} data={AyudaData.interfazAsistente}/>
                <AyudaTable title="Tablas" columns={Columns.ayudaSingleColumns} data={AyudaData.interfazTabla}/>
                <AyudaTable title="Búsqueda" columns={Columns.ayudaSingleColumns} data={AyudaData.interfazBusqueda}/>
                <AyudaTable title="Comandos" columns={Columns.ayudaSingleColumns} data={AyudaData.interfazComando}/>
            </TabPane>
            <TabPane style={{maxHeight:"69vh", overflow:"auto"}} tab={<span><Icon type="message" />Comandos</span>} key="comandos">
                <AyudaTable title="Menú" columns={Columns.ayudaSingleColumns} data={AyudaData.comandoMenu} scrollx="23rem"/>
                <AyudaTable title="Ayuda" columns={Columns.ayudaSingleColumns} data={AyudaData.comandoGeneral} scrollx="25rem"/>
                <AyudaTable title="Tablas" columns={Columns.ayudaSingleColumns} data={AyudaData.comandoTablas} scrollx="32rem"/>
                <AyudaTable title="Búsqueda" columns={Columns.ayudaSingleColumns} data={AyudaData.comandoBusqueda} scrollx="28rem"/>
                <AyudaTable title="Resumen" columns={Columns.ayudaSingleColumns} data={AyudaData.comandoResumen} scrollx="25rem"/>
                <AyudaTable title="Asistente" columns={Columns.ayudaSingleColumns} data={AyudaData.comandoAsistente} scrollx="25rem"/>
            </TabPane>
            <TabPane style={{maxHeight:"69vh", overflow:"auto"}} tab={<span><Icon type="question" />Preguntas</span>} key="preguntas">
                <AyudaTable title="Preguntas" columns={Columns.ayudaSingleColumns} data={AyudaData.preguntas} scrollx="23rem"/>
            </TabPane>
        </Tabs>
        </Modal>
      </div>
    );
  }
}

export default App