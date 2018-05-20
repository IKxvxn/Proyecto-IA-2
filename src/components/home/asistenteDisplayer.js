import React, { Component } from 'react';
import { Row, Icon } from 'antd';
import * as Style from '../../style/styleHomeLayout';
import '../../style/asistenteDisplayer.css'

class asistenteDisplayer extends Component {
  render() {
    var asistenteClass = this.props.estadoAsistente===true ? "on":"off"
    var icon = "minus"

    if(this.props.estadoAsistente){
        if(this.props.estadoSpeaking){
            icon = "sound"
        }
        else if(this.props.estadoThinking){
            icon = "loading"
        }
        else{
            icon = "eye-o"
        }
    }
    
    return (
        <Row type="flex" justify="space-around" align="middle" className={asistenteClass} style={Style.logo}><Icon type={icon} /></Row>
    );
  }
}

export default asistenteDisplayer;
