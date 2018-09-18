import userReducer from './userReducer'
import navigationReducer from "./navigationReducer";

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    navigationReducer,
    userReducer
})

export default rootReducer