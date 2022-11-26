//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux'
//引入组件服务的reducer
import menuList from './menuList'
import role from './role'
import roleList from './roleList'
import token from './token'

//汇总所有的reducer变为一个总的reducer
export default combineReducers({
    menuList,
    role,
    roleList,
    token
})