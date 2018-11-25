import userReducer from './userReducer'
import navigationReducer from "./navigationReducer";

import { combineReducers } from 'redux'
import personalPageReducer from "./PersonalPageReducer";
import profileReducer from "./ProfileReducer";
import sheetReducer from "./sheetReducer";
import personalTabReducer from "./PersonalTabReducer";
import registerReducer from "./RegisterReducer";

const rootReducer = combineReducers({
    navigationReducer,
    userReducer,
    personalPageReducer,
    personalTabReducer,
    profileReducer,
    sheetReducer,
    registerReducer
})

export default rootReducer