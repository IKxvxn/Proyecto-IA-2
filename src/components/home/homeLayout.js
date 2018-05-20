import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import Agentes from '../agentes/agentesLayout'
import Ordenes from '../ordenes/ordenesLayout'
import Distribucion from '../distribucion/distribucionLayout'
import Asistente from '../asistente/asistenteLayout'
import AsistenteDisplayer from './asistenteDisplayer'
import * as Speech from '../asistente/asistenteSpeech'
import * as Recognition from '../asistente/asistenteRecognition'
import * as asistenteActions from '../asistente/asistenteActions'
import * as Style from '../../style/styleHomeLayout';

import '../../style/codes.css'


const { Header, Sider, Content } = Layout;

class homeLayout extends Component {
    state = {
        collapsed: false,
        tab: '1'
      };
      toggle = (state) => {
        this.setState({
          collapsed: state,
        });
      }

      changeTab = (tab) => {
        this.setState({
          tab: tab,
        });
      }

      changeLocation = (name) =>{
        switch (name){
          case Recognition.locations[2]:
            this.props.history.push("/Ordenes")
            this.setState({tab:'2'})
            break
          case Recognition.locations[3]:
            this.props.history.push("/Distribucion")
            this.setState({tab:'3'})
            break
          case Recognition.locations[4]:
            this.props.history.push("/Asistente")
            this.setState({tab:'4'})
            break
          default:
            this.props.history.push("/Agentes")
            this.setState({tab:'1'})
        }
      }

      render() {
        return (
          <Layout style={{minHeight:"100vh"}}>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <AsistenteDisplayer estadoAsistente={this.props.estadoAsistente}  estadoSpeaking={this.props.estadoSpeaking} estadoThinking={this.props.estadoThinking}/>
              <Menu theme="dark" mode="inline" selectedKeys={[this.state.tab]} onClick={(obj)=>{this.changeTab(obj.key)}}>
                <Menu.Item key="1" onClick={()=>this.props.history.push("/Agentes")}>
                  <Link to='/Agentes'>
                    <Icon type="team" />
                    <span>Agentes</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to='/Ordenes'>
                    <Icon type="copy" />
                    <span>Órdenes</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to='/Distribucion'>
                    <Icon type="table" />
                    <span>Distribución</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to='/Asistente'>
                    <Icon type="bulb" />
                    <span>Asistente</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout>
              <Header style={Style.header}>
                <Icon
                  style={Style.trigger}
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={() =>this.toggle(!this.state.collapsed)}
                />
                {this.props.transcript}
              </Header>
              <Content style={Style.content}>
                <Switch>
                  <Route path='/Agentes' render={() => <Agentes />}/>
                  <Route path='/Ordenes' render={() => <Ordenes />}/>
                  <Route path='/Distribucion' render={() => <Distribucion />}/>
                  <Route path='/Asistente' render={() => <Asistente />}/>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        );
      }
      componentWillMount(){
        switch(window.location.pathname) {
          case "/Agentes":
              this.setState({tab:'1'})
              break;
          case "/Ordenes":
            this.setState({tab:'2'})
            break;
          case "/Distribucion":
            this.setState({tab:'3'})
            break;  
          case "/Asistente":
              this.setState({tab:'4'})
              break;                
          default:
              this.props.history.push("/Agentes")
              this.setState({tab:'1'})
        }
      }
      componentDidMount(){
        this._mounted = true;
        this.props.abortListening()

        isSpeaking(this)
      }

      componentWillUnmount(){
        this._mounted = false;
      }
    }
    function mapStateToProps(state) {
      return {
        estadoSpeaking: state.asistenteReducer.speaking,
        estadoThinking: state.asistenteReducer.thinking,
        estadoAsistente: state.asistenteReducer.activo
      }
    }
    
    function mapDispatchToProps(dispatch) {
      return {
        cambiarEstadoSpeaking: ()  => dispatch(asistenteActions.cambiarEstadoSpeaking()),
        cambiarEstadoThinking: ()  => dispatch(asistenteActions.cambiarEstadoThinking()),
        cambiarEstadoAsistente: ()  => dispatch(asistenteActions.cambiarEstadoAsistente())
      }
    }
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function isSpeaking(component) {
      while(component._mounted){
        if(window.speechSynthesis.speaking){
          component.props.abortListening()
          component.props.cambiarEstadoSpeaking()
          while(window.speechSynthesis.speaking){await sleep(250);}
        }
        else{
          component.props.cambiarEstadoSpeaking()
          component.props.estadoAsistente===true ? component.props.startListening() : false
          var transcripCopy = component.props.transcript
          while(!window.speechSynthesis.speaking){
            await sleep(500);
            if(!component.props.estadoAsistente){await sleep(250);}
            else if (transcripCopy===component.props.transcript && transcripCopy!==""){
              component.props.abortListening()
              component.props.cambiarEstadoThinking()
              
              await sleep(1000);
              procesarSpeech(transcripCopy.toLowerCase(),component)
              
              component.props.resetTranscript()
              component.props.cambiarEstadoThinking()
              
              if(window.speechSynthesis.speaking){break}
              component.props.startListening()
            }
            else if(!component.props.estadoThinking && !window.speechSynthesis.speaking && component.props.estadoAsistente && !component.props.listening){
              component.props.cambiarEstadoAsistente()
            }
            else{
              transcripCopy = component.props.transcript
            }
          }
        }
      }
    }

    function procesarSpeech(transcript,component){
      if (Recognition.containsAny(transcript,Recognition.apagarEntities)!==null && Recognition.containsAny(transcript,Recognition.asistente)!==null){
        component.props.cambiarEstadoAsistente()
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.irEntities)!==null){
        var location = Recognition.containsAny(transcript,Recognition.locations)
        if (location!==null){
          component.changeLocation(location)
          return
        }
      }
      else if (Recognition.containsAny(transcript,Recognition.colapsar)!==null && Recognition.containsAny(transcript,Recognition.menu)!==null){
        component.toggle(true)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.expandir)!==null && Recognition.containsAny(transcript,Recognition.menu)!==null){
        component.toggle(false)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.nameEntities)!==null){
        Speech.Speech(Speech.name)
        return
      }
      
      Speech.Speech(Speech.NotFount)
      
    }

    
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(homeLayout))
