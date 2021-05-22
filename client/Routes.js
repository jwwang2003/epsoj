import App from './App'
import Login from './Routes/Login'
import Home from './Routes/Home'

export default [
  {
    ...App,
    routes: [
      {
        ...Login,
        path: '/',
        exact: true
      },
      {
        ...Home,
        path: '/home'
      },
      
    ]
  }
]