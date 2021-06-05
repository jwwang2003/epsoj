import { h } from "preact";
import { Layout, Menu, Breadcrumb } from "antd";
import { useState, useEffect } from "preact/hooks";
import { Link, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import {
  NotificationOutlined,
  CloudServerOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import Students from "./sub/Students";
import AddStudents from "./sub/AddStudents";
import Assignments from "./sub/Assignments";

const routes = {
  admin: [
    {
      name: "Recent",
      path: "/admin/recents",
      icon: <NotificationOutlined />,
      show: true,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: <UserOutlined />,
      component: Students,
      show: true,
    },
    {
      path: "/admin/addStudents",
      component: AddStudents,
      show: false,
    },
    {
      name: "Classes",
      path: "/admin/classes",
      icon: <TeamOutlined />,
      show: true,
    },
    {
      name: "Assignments",
      path: "/admin/assignments",
      icon: <FileOutlined />,
      component: Assignments,
      show: true,
    },
    {
      name: "Server Status",
      path: "/admin/server",
      icon: <CloudServerOutlined />,
      show: true,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <SettingOutlined />,
      show: true,
    },
  ],
  app: [
    {
      name: "Recents",
      path: "/app/recents",
      icon: <NotificationOutlined />,
      show: true,
    },
    {
      name: "Assignments",
      path: "/app/assignments",
      icon: <FileOutlined />,
      show: true,
    },
    {
      name: "Me",
      path: "/app/me",
      icon: <UserOutlined />,
      show: true,
    },
  ],
};

const { Sider } = Layout;

export default function Main() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [paths, setPaths] = useState([]);
  const [mode, setMode] = useState("");

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setPaths(window.location.href.split("/").slice(3));
    setMode(window.location.href.split("/").slice(3)[0]);
  }, [global.window && window.location.href]);

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        breakpoint="md"
        collapsedWidth="0"
      >
        <Menu selectedKeys={[paths[1]]} mode="inline">
          {mode &&
            routes[mode]
              .filter((route) => route.show)
              .map((route) => {
                return (
                  <Menu.Item key={route.path.split("/")[2]} icon={route.icon}>
                    <Link to={route.path}>{route.name}</Link>
                  </Menu.Item>
                );
              })}
        </Menu>
      </Sider>
      <div style={{ width: "100%", margin: "0 1rem 0 2.5rem" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          {paths.map((crumb) => (
            <Breadcrumb.Item key={crumb}>{crumb}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <div style={{ height: "min-content" }}>
          <TransitionGroup>
            <CSSTransition
              key={
                mode &&
                routes[mode].map((r) => r.path).includes(location.pathname)
                  ? location.key
                  : false
              }
              classNames="fade"
              timeout={250}
            >
              <Switch location={location}>
                <Route path={`/${mode}`} exact>
                  <Redirect to={`/${mode}/recents`} />
                </Route>
                {mode &&
                  routes[mode].map((route) => {
                    if (route.component)
                      return (
                        <Route path={route.path} render={route.component} />
                      );
                    else return <Route path={route.path}></Route>;
                  })}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      <style>{`
        .ant-layout-sider-trigger {
          position: absolute;
        }
      `}</style>
    </Layout>
  );
}
