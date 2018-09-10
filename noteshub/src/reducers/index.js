import player from './player'
import settings from './settings'
import intro from './intro'
import ending from './ending'
import sections from './sections'
import sheet from './sheet'
import userReducer from './userReducer'

import { combineReducers } from 'redux'

const sheetReducer = combineReducers({
    player,
    settings,
    intro,
    ending,
    sections,
    sheet,
})

export default sheetReducer