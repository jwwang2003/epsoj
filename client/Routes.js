// import Content from './pages/Content';
// import NotFound from './pages/NotFound';
// import App from './App';

// export default [{
//   ...App,
//   routes: [
//     {
//       ...Content,
//       path: '/',
//       exact: true,
//     }, {
//       ...NotFound,
//     },
//   ],
// }];

import App from './App'
import { Home, Test } from './pages'

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