import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Row, Col, Switch, Icon, Rate } from 'antd';
import * as asistenteActions from './asistenteActions'

import Asistente from '../../images/asistente.png'
import Mensajes from '../../images/mensajes.png'
import Ayuda from '../../images/ayuda.png'


const { Meta } = Card;

class asistenteLayout extends Component {

  state = {
    notificaciones:false,
    ayuda:false
  }

  render() {
    return (
      <Row type="flex" justify="start" gutter={24} style={{maxHeight:"25vh"}}>
        <Col > 
          <Card
            hoverable
            onClick={() => this.props.cambiarEstadoAsistente()}
            style={{ width: "13rem" }}
            cover={<img alt="Imagen del Asistente" src={Asistente} />}
          >
            <Meta
              title={<Row><Col span={20}>Asistente Virtual</Col><Col span={4}><Rate style={{color:"#1890ff", margin:"-1rem 0"}} count={1} disabled value={this.props.estadoAsistente?1:0} character={<Icon type={this.props.estadoAsistente?"check-circle":"close-circle"}/>}  /></Col></Row>}
              description="Facilita las labores"
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    estadoAsistente: state.asistenteReducer.estadoAsistente,
    estadoNotificaciones: state.asistenteReducer.estadoNotificaciones,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cambiarEstadoAsistente: ()  => dispatch(asistenteActions.cambiarEstadoAsistente()),
    cambiarEstadoNotificaciones: ()  => dispatch(asistenteActions.cambiarEstadoNotificaciones()),
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(asistenteLayout)