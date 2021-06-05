import { h } from "preact";
import { Layout } from "antd";
import { Switch, Route, Link, useLocation } from "react-router-dom";
// import { TransitionGroup, CSSTransition } from "react-transition-group";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Main from "./pages/Main";

import "./App.css";

export default function App() {
  const location = useLocation();

  return (
    <Layout className="layout-base">
      <Header />
      {/* <TransitionGroup style={{ position: "relative" }}>
        <CSSTransition
          key={
            routes.filter(r => { return !r.secure }).map(r => r.path).includes(location.pathname)
              ? location.key
              : false
          }
          classNames="fade"
          timeout={250}
        > */}
      <Switch location={location}>
        <Route path="/" exact component={Login} />
        <Route path="/app" component={Main} />
        <Route path="/admin" component={Main} />
      </Switch>
      {/* </CSSTransition>
      </TransitionGroup> */}
      <Footer />
      <div style={{ height: "0", position: "absolute" }}>
        <Link to="/app" />
        <Link to="/admin" />
      </div>
    </Layout>
  );
}
