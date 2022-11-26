import Login from './../pages/containers/Login'
import Home from './../pages/Home'
import Setting from './../pages/Setting'
import Welcome from './../pages/Welcome'
import Children from './../pages/Welcome'
import {Navigate} from 'react-router-dom'

const routes = [
	{
		path:'/login',
		element:<Login/>
	},
	{
		path:'/home',
		element:<Home/>,
		children:[
			{
				path:'welcome',
				element:<Welcome/>
			},
			{
				path:'setting',
				element:<Setting/>,
				children:[
					{
						path:'children',
						element:<Children/>
					},
				]
			}
		]
	},
	{
		path:'/',
		element:<Navigate to="/welcome"/>
	}
]

export default routes