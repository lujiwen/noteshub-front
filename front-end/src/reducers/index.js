import userReducer from './userReducer'
import navigationReducer from "./navigationReducer";

import { combineReducers } from 'redux'
import personalPageReducer from "./PersonalPageReducer";
import profileReducer from "./ProfileReducer";
import sheetReducer from "./sheetReducer";

const rootReducer = combineReducers({
    navigationReducer,
    userReducer,
    personalPageReducer,
    profileReducer,
    sheetReducer
})

export default rootReducer