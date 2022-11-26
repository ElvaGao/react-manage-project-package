// import { createStore } from "redux"
// import reducers from './reducers'
// import thunk from 'redux-thunk';

// //创建存储对象并且抛出对象
// export default createStore( reducers )

import { createStore, applyMiddleware   } from "redux"
import reducers from './reducers'
import thunk from 'redux-thunk'
// import storage from 'redux-persist/lib/storage' // 本地存储
import sessionStorage from 'redux-persist/lib/storage/session' // 会话存储
//引入redux-persist持久化
import { persistStore, persistReducer } from 'redux-persist'
//实现persist数据持久化
const persistConfig = {
    key: 'root',
    storage: sessionStorage,
}
//处理持久化store
const persistedReducer = persistReducer(persistConfig, reducers)
//创建存储对象并且抛出对象
const store = createStore(persistedReducer,applyMiddleware(thunk));  //创建一个store
let persistor = persistStore(store)
export {
    store,
    persistor
}