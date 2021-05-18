import * as React from 'react'
import ReactDOM from 'react-dom'
import App from '../shared/App'
import { BrowserRouter } from 'react-router-dom'

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

renderMethod(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);

if(module.hot) {
  module.hot.accept('./App.jsx', function() {
    renderMethod(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('app')
    );
  })
}