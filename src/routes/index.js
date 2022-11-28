import Login from './../pages/containers/Login'
import Home from './../pages/Home'
import E404 from './../pages/E404'
import Setting from './../pages/Setting'
import Welcome from './../pages/Welcome'
import Children from './../pages/Children'
import {Navigate} from 'react-router-dom'

const routes = [
	{
		path:'/login',
		element: <Login/>
	},
	{
		path:'/home',
		element: <Home/>,
		children:[
			{
				path:'welcome',
				element: <Welcome/>
			},
			{
				path:'setting',
				// element: <Setting/>,
				children:[
					{
						path:'children',
						element: <Children/>
					},
				]
			},
			{
				path:'*',
				element: <E404/>
			}
		]
	},
	{
		path:'/',
		element: <Navigate to="/welcome"/>
	},
	{
		path:'*',
		element: <Navigate to="/home/404"/>
	}
]

export default routes