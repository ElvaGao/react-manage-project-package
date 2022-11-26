import { connect } from "react-redux"
// import Login from './containers/Login'; //引入的Login的容器组件
import AppStyle from "./App.module.scss"
// 路由
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import routes from './routes'
import React from 'react'

function AppUI(props) {
  const { token } = props
  const navigate = useNavigate()
  const location = useLocation()
  // 登录拦截
  React.useEffect(()=>{
    if(location.pathname==='/login'){

    }else if(!token){
      navigate('login')
    }
	})
  //根据路由表生成对应的路由规则
	const element = useRoutes(routes)
  return (
        <div className={AppStyle.content}>
            {/* 注册路由 */}
            {element}
        </div>
      
  );
}

export default connect(
  state => ({
      token: state.token
  }),
  {}
)(AppUI);