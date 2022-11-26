import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// store和数据持久化
import { store, persistor } from './redux/store'
//导入react-redux对象 用于分发数据
import { Provider } from "react-redux"
// 数据持久化
import { PersistGate } from 'redux-persist/integration/react' 


//引入mock数据，关闭则注释该行
require('./fetchMock') 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
  </Provider>
);