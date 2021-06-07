import { h, Fragment } from "preact";
import { Switch, Route, Link } from "react-router-dom";
import {Helmet} from "react-helmet";

// Custom lazyload (code splitting)
import customLazy from "./components/customLazy";

// UI elements
import { Layout } from "antd";
import Header from "./components/globalHeader";
import Footer from "./components/globalFooter";

// Pages
import Login from "./pages/Login";
const _App = customLazy(() => import(/* webpackChunkName: "LAZY_App" */ "./pages/App"));
const _Admin = customLazy(() => import(/* webpackChunkName: "LAZY_Admin" */ "./pages/Admin"));

import icon from "./static/logo.ico";

export default function App() {
  return (
    <Layout className="layout-base">
      <Helmet>
        <title>EPSOJ</title>
        <link rel="icon" type="image/png" href={icon} />
      </Helmet>
      <Header />
      <div style={{ height: "100%", overflowX: "hidden" }}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/app" component={_App} />
          <Route path="/admin" component={_Admin} />
        </Switch>
      </div>
      <Footer />
      <div style={{ height: "0", position: "absolute" }}>
        <Link to="/app" />
        <Link to="/admin" />
      </div>
    </Layout>
  );
}