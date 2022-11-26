import React from 'react'
import { Outlet } from 'react-router-dom'

import Siderbar from '../containers/Siderbar'
import Header from './../containers/Header'
// api接口
import HomeStyle from "./Home.module.scss"

export default function Home() {
	return (
		<div className={HomeStyle.consider}>
			<Header/>
			<Siderbar/>
			{/* 指定路由组件呈现的位置 */}
			<div className={HomeStyle.content}>
				<Outlet />
			</div>
		</div>
	)
}
