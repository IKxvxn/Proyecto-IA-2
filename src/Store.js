import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import asistenteReducer from './components/asistente/asistenteReducer'
import agentesReducer from './components/agentes/agentesReducer'
import ordenesReducer from './components/ordenes/ordenesReducer'


const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
})

const Store = createStore(combineReducers({asistenteReducer:asistenteReducer, agentesReducer:agentesReducer, ordenesReducer:ordenesReducer}),
composeWithDevTools(
  applyMiddleware(
    ReduxThunk,
    logger
  ),
))

export default Store