import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Routes from './Routes'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../theme'

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {renderRoutes(Routes)}
      </ThemeProvider>
    </Router>
  )
}

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

renderMethod(<Main />, document.querySelector('#root'))

if(module.hot) {
  module.hot.accept()
}