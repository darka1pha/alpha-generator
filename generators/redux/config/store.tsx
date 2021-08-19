import {createStore , applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from "redux-logger";
import rootReducer from './rootReducer'

const initialState ={}

const middleware = [logger]

const store = createStore(
            rootReducer , 
            initialState ,
            composeWithDevTools(
                applyMiddleware(...middleware)
                    )
                )

export default store