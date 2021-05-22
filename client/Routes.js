import App from './App'
import Home from './Home'
import Test from './Test'

export default [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: '/',
        exact: true
      },
      {
        ...Test,
        path: '/test'
      }
    ]
  }
]