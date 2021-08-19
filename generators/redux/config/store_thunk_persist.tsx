import { persistReducer } from "redux-persist";
import {createStore , applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import logger from "redux-logger";
import rootReducer from './rootReducer'
import storage from 'redux-persist/lib/storage'

const initialState ={}

const persistConfig = {
  key: "primary",
  storage,
  whitelist: [/* Your Whitelist Keys */],
  timeout: null,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk,logger]

const store = createStore(
            persistedReducer , 
            initialState ,
            composeWithDevTools(
                applyMiddleware(...middleware)
                    )
                )

export default store