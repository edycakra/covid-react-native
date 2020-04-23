import { combineReducers } from 'redux'
import { global } from './global'
import { local } from './local'
import { rank } from './rank'
import { list } from './list'


export const rootReducer = combineReducers({
    global,
    local,
    rank,
    list
})