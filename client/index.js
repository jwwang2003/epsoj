import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Routes from './Routes'

function Foo() {
  return (
    <Router>
      {renderRoutes(Routes)}
    </Router>
  )
}

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
renderMethod(
  <Foo />,
  document.getElementById('root')
)

if(module.hot) {
  module.hot.accept('./Routes', function() {
    renderMethod(
      <Foo />,
      document.getElementById('root')
    )
  })
}