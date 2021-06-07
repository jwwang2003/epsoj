import { h } from "preact";
import { BrowserRouter as Router } from "react-router-dom";
import { hydrate, render } from "react-dom";

import App from "./App";

import "./index.css";

const _App = () => (
  <Router>
    <App />
  </Router>
);

// React-snap template
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<_App />, rootElement);
} else {
  render(<_App />, rootElement);
}

if (module.hot) {
  module.hot.accept("./App", function () {
    render(<_App />, rootElement);
  });
}