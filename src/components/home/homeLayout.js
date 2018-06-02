import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import Agentes from '../agentes/agentesLayout'
import Ordenes from '../ordenes/ordenesLayout'
import Distribucion from '../distribucion/distribucionLayout'
import Asistente from '../asistente/asistenteLayout'
import AsistenteDisplayer from './asistenteDisplayer'
import Ayuda from '../modals/ayuda'
import Error from '../modals/error'
import * as Speech from '../../assets/speech'
import * as Recognition from '../../assets/recognition'
import * as asistenteActions from '../asistente/asistenteActions'
import * as agentesActions from '../agentes/agentesActions'
import * as ordenesActions from '../ordenes/ordenesActions'
import * as distribucionActions from '../distribucion/distribucionActions'
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
          case Recognition.locationsNouns[2]:
            this.props.history.push("/Ordenes")
            this.setState({tab:'2'})
            break
          case Recognition.locationsNouns[3]:
            this.props.history.push("/Distribucion")
            this.setState({tab:'3'})
            break
          case Recognition.locationsNouns[4]:
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
                <Row type="flex" justify="space-between">
                  <Col>
                    <Icon
                      style={Style.trigger}
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={() =>this.toggle(!this.state.collapsed)}
                    />
                  </Col>
                  <Col>{this.props.transcript}</Col>
                  <Col><Ayuda changeAyudaTab={this.props.changeAyudaTab} currentTabAyuda={this.props.currentTabAyuda} estadoAyudaModal={this.props.estadoAyudaModal} showAyudaModal={this.props.showAyudaModal} hideAyudaModal={this.props.hideAyudaModal}/></Col>
                </Row>
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
            <Error errors={this.props.chargeErrors} estadoErrorModal={this.props.estadoErrorModal} showErrorModal={this.props.showErrorModal} hideErrorModal={this.props.hideErrorModal}/>
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
        estadoAsistente: state.asistenteReducer.estadoAsistente,
        currentTabAyuda: state.asistenteReducer.currentTabAyuda,
        estadoAyudaModal: state.asistenteReducer.estadoAyudaModal,
        currentTabAyuda: state.asistenteReducer.currentTabAyuda,
        estadoErrorModal: state.asistenteReducer.estadoErrorModal,
        currentPageOrdenes: state.ordenesReducer.currentPage,
        currentPageAgentes: state.agentesReducer.currentPage,
        currentPageDistribucion: state.distribucionReducer.currentPage,
        chargeErrors:state.asistenteReducer.errors,
      }
    }
    
    function mapDispatchToProps(dispatch) {
      return {
        cambiarEstadoSpeaking: ()  => dispatch(asistenteActions.cambiarEstadoSpeaking()),
        cambiarEstadoThinking: ()  => dispatch(asistenteActions.cambiarEstadoThinking()),
        cambiarEstadoAsistente: ()  => dispatch(asistenteActions.cambiarEstadoAsistente()),
        hideAyudaModal: ()  => dispatch(asistenteActions.hideAyudaModal()),
        showAyudaModal: ()  => dispatch(asistenteActions.showAyudaModal()),
        changeAyudaTab: (tab) => dispatch(asistenteActions.changeAyudaTab(tab)),
        hideErrorModal: ()  => dispatch(asistenteActions.hideErrorModal()),
        cargarAgentes: ()  => dispatch(agentesActions.cargarAgentes()),
        actualizarFiltroAgente: (filtro)  => dispatch(agentesActions.actualizarFiltro(filtro)),
        cargarOrdenes: ()  => dispatch(ordenesActions.cargarOrdenes()),
        calcularDistribucion: ()  => dispatch(distribucionActions.calcularDistribucion()),
        actualizarFiltroOrdenes: (filtro)  => dispatch(ordenesActions.actualizarFiltro(filtro)),
        actualizarFiltroDistribucion: (filtro)  => dispatch(distribucionActions.actualizarFiltro(filtro)),
        actualizarPageOrdenes: (page, dispatcher)  => dispatch(ordenesActions.actualizarPage(page, dispatcher)),
        actualizarPageAgentes: (page, dispatcher)  => dispatch(agentesActions.actualizarPage(page, dispatcher)),
        actualizarPageDistribucion: (page, dispatcher)  => dispatch(distribucionActions.actualizarPage(page, dispatcher)),
        addExpandedDistribucion: (page, dispatcher)  => dispatch(distribucionActions.addExpanded(page, dispatcher)),
        removeExpandedDistribucion: (page, dispatcher)  => dispatch(distribucionActions.removeExpanded(page, dispatcher)),
        allExpandedDistribucion: (dispatcher)  => dispatch(distribucionActions.allExpanded(dispatcher)),
        noneExpandedDistribucion: (dispatcher)  => dispatch(distribucionActions.noneExpanded(dispatcher)),
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
              component.props.startListening()
            }
            else{
              transcripCopy = component.props.transcript
            }
          }
        }
      }
    }

    function procesarSpeech(transcript,component){
      if (Recognition.containsAny(transcript,Recognition.apagarVerbs)!==null && Recognition.containsAny(transcript,Recognition.asistenteNouns)!==null){
        component.props.cambiarEstadoAsistente()
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.buscarVerbs)!==null && Recognition.containsAny(transcript,Recognition.buscarVerbs)!=transcript){
        const keyword = Recognition.containsAny(transcript,Recognition.buscarVerbs)
        
        switch(window.location.pathname) {
          case "/Agentes":
            component.props.actualizarFiltroAgente(transcript.replace(keyword,''))
            Speech.Speech(Speech.oK)
            break;
          case "/Ordenes":
            component.props.actualizarFiltroOrdenes(transcript.replace(keyword,''))
            Speech.Speech(Speech.oK)
            break;
          case "/Distribucion":
            component.props.actualizarFiltroDistribucion(transcript.replace(keyword,''))
            Speech.Speech(Speech.oK)
            break;  
          default:
            Speech.Speech(Speech.wrongContext)
        }
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.expandirVerbs)!==null && Recognition.containsAny(transcript,Recognition.rowNouns)!==null && Recognition.containsAny(transcript,Recognition.allNouns)!==null) {
          switch(window.location.pathname) {
            case "/Agentes":
              Speech.Speech(Speech.noRowsToExpand)
              break;
            case "/Ordenes":
            Speech.Speech(Speech.noRowsToExpand)
              break;
            case "/Distribucion":
              component.props.allExpandedDistribucion(true)
              break;  
            default:
              Speech.Speech(Speech.wrongContext)
          }
          return
      }
      else if (Recognition.containsAny(transcript,Recognition.expandirVerbs)!==null && Recognition.containsAny(transcript,Recognition.rowNouns)!==null){
        var page = Recognition.getFirstNumber(transcript)
        if(page!==undefined){

          switch(window.location.pathname) {
            case "/Agentes":
              Speech.Speech(Speech.noRowsToExpand)
              break;
            case "/Ordenes":
            Speech.Speech(Speech.noRowsToExpand)
              break;
            case "/Distribucion":
              component.props.addExpandedDistribucion(page, true)
              break;  
            default:
              Speech.Speech(Speech.wrongContext)
          }
          return
        }
      }
      else if (Recognition.containsAny(transcript,Recognition.colapsarVerbs)!==null && Recognition.containsAny(transcript,Recognition.allNouns)!==null && Recognition.containsAny(transcript,Recognition.rowNouns)!==null){
        switch(window.location.pathname) {
          case "/Agentes":
            Speech.Speech(Speech.noRowsToExpand)
            break;
          case "/Ordenes":
          Speech.Speech(Speech.noRowsToExpand)
            break;
          case "/Distribucion":
            component.props.noneExpandedDistribucion(true)
            break;  
          default:
            Speech.Speech(Speech.wrongContext)
        }
        return
     }
      else if (Recognition.containsAny(transcript,Recognition.colapsarVerbs)!==null && Recognition.containsAny(transcript,Recognition.rowNouns)!==null){
        var page = Recognition.getFirstNumber(transcript)
        if(page!==undefined){

          switch(window.location.pathname) {
            case "/Agentes":
              Speech.Speech(Speech.noRowsToExpand)
              break;
            case "/Ordenes":
            Speech.Speech(Speech.noRowsToExpand)
              break;
            case "/Distribucion":
              component.props.removeExpandedDistribucion(page, true)
              break;  
            default:
              Speech.Speech(Speech.wrongContext)
          }
          return
        }
      }
      else if (Recognition.containsAny(transcript,Recognition.busquedaNouns)!==null&&Recognition.containsAny(transcript,Recognition.limpiarVerbs)!==null){
        switch(window.location.pathname) {
          case "/Agentes":
            component.props.actualizarFiltroAgente("")
            Speech.Speech(Speech.oK)
            break;
          case "/Ordenes":
            component.props.actualizarFiltroOrdenes("")
            Speech.Speech(Speech.oK)
            break;
          case "/Distribucion":
            component.props.actualizarFiltroDistribucion("")
            Speech.Speech(Speech.oK)
            break;  
          default:
            Speech.Speech(Speech.wrongContext)
        }
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.irVerbs)!==null && Recognition.containsAny(transcript,Recognition.siguienteNouns)!==null && Recognition.containsAny(transcript,Recognition.pageNouns)!==null){
        switch(window.location.pathname) {
            case "/Agentes":
              component.props.actualizarPageAgentes(component.props.currentPageAgentes+1, true)
              break;
            case "/Ordenes":
              component.props.actualizarPageOrdenes(component.props.currentPageOrdenes+1, true)
              break;
            case "/Distribucion":
              component.props.actualizarPageDistribucion(component.props.currentPageDistribucion+1, true)
              break;  
            default:
              Speech.Speech(Speech.wrongContext)
          }
          return
      }
      else if (Recognition.containsAny(transcript,Recognition.irVerbs)!==null && Recognition.containsAny(transcript,Recognition.anteriorNouns)!==null && Recognition.containsAny(transcript,Recognition.pageNouns)!==null){
        switch(window.location.pathname) {
            case "/Agentes":
              component.props.actualizarPageAgentes(component.props.currentPageAgentes-1, true)
              break;
            case "/Ordenes":
              component.props.actualizarPageOrdenes(component.props.currentPageOrdenes-1,true)
              break;
            case "/Distribucion":
              component.props.actualizarPageDistribucion(component.props.currentPageDistribucion-1, true)
              break;  
            default:
              Speech.Speech(Speech.wrongContext)
          }
          return
      }
      else if (Recognition.containsAny(transcript,Recognition.irVerbs)!==null && Recognition.containsAny(transcript,Recognition.pageNouns)!==null){
        var page = Recognition.getFirstNumber(transcript)
        if(page!==undefined){

          switch(window.location.pathname) {
            case "/Agentes":
              component.props.actualizarPageAgentes(page, true)
              break;
            case "/Ordenes":
              component.props.actualizarPageOrdenes(page, true)
              break;
            case "/Distribucion":
              component.props.actualizarPageDistribucion(page, true)
              break;  
            default:
              Speech.Speech(Speech.wrongContext)
          }
          return
        }
      }
      else if (Recognition.containsAny(transcript,Recognition.openModalVerbs)!==null && Recognition.containsAny(transcript,Recognition.ayudaNouns)!==null){
        if(component.props.estadoAyudaModal===true){Speech.Speech(Speech.alreadyShowingHelp);return}
        component.props.showAyudaModal()
        Speech.Speech(Speech.ayudaShow)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.irVerbs)!==null && Recognition.containsAny(transcript,Recognition.ayudalocationsNouns)!==null){
        if(component.props.estadoAyudaModal===true && component.props.currentTabAyuda===Recognition.containsAny(transcript,Recognition.ayudalocationsNouns)){Speech.Speech(Speech.alreadyOnPage);return}
        component.props.estadoAyudaModal===true? Speech.Speech(Speech.oK):Speech.Speech(Speech.ayudaShow)
        component.props.changeAyudaTab(Recognition.containsAny(transcript,Recognition.ayudalocationsNouns))
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.closeModalVerbs)!==null && Recognition.containsAny(transcript,Recognition.ayudaNouns)!==null){
        if(component.props.estadoAyudaModal===false){Speech.Speech(Speech.alreadyClosedHelp);return}
        component.props.hideAyudaModal()
        Speech.Speech(Speech.oK)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.closeModalVerbs)!==null && Recognition.containsAny(transcript,Recognition.resumenNouns)!==null){
        if(component.props.estadoErrorModal===false){Speech.Speech(Speech.alreadyClosedError);return}
        component.props.hideErrorModal()
        Speech.Speech(Speech.oK)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.irVerbs)!==null){
        var location = Recognition.containsAny(transcript,Recognition.locationsNouns)
        if (location!==null){
          if(window.location.pathname.includes(toTitleCase(location))){Speech.Speech(Speech.alreadyOnPage);return}
          component.changeLocation(location)
          Speech.Speech(Speech.oK)
          return
        }
      }
      else if (Recognition.containsAny(transcript,Recognition.colapsarVerbs)!==null && Recognition.containsAny(transcript,Recognition.menuNouns)!==null){
        if(component.state.collapsed===true){Speech.Speech(Speech.alreadyColapsedMenu);return}
        component.toggle(true)
        Speech.Speech(Speech.oK)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.expandirVerbs)!==null && Recognition.containsAny(transcript,Recognition.menuNouns)!==null){
        if(component.state.collapsed===false){Speech.Speech(Speech.alreadyOpenedMenu);return}
        component.toggle(false)
        Speech.Speech(Speech.oK)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.cargarVerbs)!==null && Recognition.containsAny(transcript,Recognition.datosVerbs)!==null){
        switch(window.location.pathname) {
          case "/Agentes":
              component.props.cargarAgentes()
              break;
          case "/Ordenes":
            component.props.cargarOrdenes()
            break;
          default:
            Speech.Speech(Speech.wrongContext)
              
        }
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.calcularVerbs)!==null && Recognition.containsAny(transcript,Recognition.distribucionNouns)!==null){
        switch(window.location.pathname) {
          case "/Distribucion":
              component.props.calcularDistribucion()
              break;
          default:
            Speech.Speech(Speech.wrongContext)
              
        }
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.nameQuestions)!==null){
        Speech.Speech(Speech.name)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.estadoQuestions)!==null){
        Speech.Speech(Speech.estado)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.edadQuestions)!==null){
        Speech.Speech(Speech.edad)
        return
      }
      else if (Recognition.containsAny(transcript,Recognition.afectoQuestions)!==null){
        Speech.Speech(Speech.afecto)
        return
      }
      Speech.Speech(Speech.NotFount)
      
    }

    
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(homeLayout))

function toTitleCase(str) {
  str = str.replace("ó","o")
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
