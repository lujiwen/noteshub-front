import userReducer from './userReducer'
import navigationReducer from "./navigationReducer";

import { combineReducers } from 'redux'
import personalPageReducer from "./PersonalPageReducer";
import profileReducer from "./ProfileReducer";
import sheetReducer from "./sheetReducer";
import personalTabReducer from "./PersonalTabReducer";
import registerReducer from "./RegisterReducer";
import musicSheetPlayerReducer from "./musicSheetPlayerReducer";


const rootReducer = combineReducers({
    navigationReducer,
    userReducer,
    personalPageReducer,
    personalTabReducer,
    profileReducer,
    sheetReducer,
    registerReducer,
    musicSheetPlayerReducer
})

export default rootReducer