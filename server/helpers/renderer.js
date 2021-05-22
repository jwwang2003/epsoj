import React from 'react'
// import { renderToString } from 'react-dom/server'
import { renderToStringAsync as renderToString } from "react-render-to-string-async"
import { Helmet } from 'react-helmet'
import { StaticRouter } from "react-router-dom"
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { renderRoutes } from "react-router-config"
import Routes from '../../client/Routes'
import theme from '../../common/theme'

function renderFullPage(html, css) {
  const helmet = Helmet.renderStatic()
  
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <style id="jss-server-side">${css}</style>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </head>
      <body>
        <script async src="dist/main.js"></script>
        <script async src="dist/vendor.js"></script>
        <div id="root">${html}</div>
      </body>
    </html>
  `
}

export default async function handleRender(req, res) {
  const sheets = new ServerStyleSheets()
  
  // Render the component to a string.
  const html = await renderToString(
    sheets.collect(
      <StaticRouter location={req.path}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {renderRoutes(Routes)}
        </ThemeProvider>
      </StaticRouter>,
    ),
  )

  // Grab the CSS from our sheets.
  const css = sheets.toString()

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css))
}