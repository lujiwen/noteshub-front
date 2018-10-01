import userReducer from './userReducer'
import navigationReducer from "./navigationReducer";

import { combineReducers } from 'redux'
import personalPageReducer from "./PersonalPageReducer";
import profileReducer from "./ProfileReducer";

const rootReducer = combineReducers({
    navigationReducer,
    userReducer,
    personalPageReducer,
    profileReducer
})

export default rootReducer