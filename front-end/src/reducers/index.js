import userReducer from './userReducer'
import navigationReducer from "./navigationReducer";

import { combineReducers } from 'redux'
import personalPageReducer from "./PersonalPageReducer";
import profileReducer from "./ProfileReducer";
import sheetReducer from "./sheetReducer";
import personalTabReducer from "./PersonalTabReducer";

const rootReducer = combineReducers({
    navigationReducer,
    userReducer,
    personalPageReducer,
    personalTabReducer,
    profileReducer,
    sheetReducer
})

export default rootReducer