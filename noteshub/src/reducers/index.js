import userReducer from './userReducer'
import navigationReducer from "./navigationReducer";

import { combineReducers } from 'redux'
import personalPageReducer from "./PersonalPageReducer";

const rootReducer = combineReducers({
    navigationReducer,
    userReducer,
    personalPageReducer,
})

export default rootReducer