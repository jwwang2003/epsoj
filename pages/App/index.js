import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  FileOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

const { Content, Footer, Sider } = Layout;

const routes = [
  {
    name: "Recents",
    path: "/App/Recents",
    icon: <NotificationOutlined />,
  },
  {
    name: "Assignments",
    path: "/App/Assignments",
    icon: <FileOutlined />,
  },
  {
    name: "Me",
    path: "/App/Me",
    icon: <UserOutlined />,
  },
];

export default function App() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [paths, setPaths] = useState([]);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    setPaths(location.pathname.split("/"));
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        style={{ background: "white" }}
      >
        <Menu
          theme="light"
          defaultSelectedKeys={[location.pathname.split("/")[2]]}
          mode="inline"
        >
          {routes.map((route) => {
            return (
              <Menu.Item key={route.path.split("/")[2]} icon={route.icon}>
                <Link to={route.path}>{route.name}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {paths.map((crumb) => (
              <Breadcrumb.Item key={crumb}>{crumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{ height: "100%" }}>
            <Switch>
              {routes.map((route) => {
                return (
                  <Route key={route.path} path={route.path}>
                    {route.name}
                  </Route>
                );
              })}
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          EPSOJ ©2021 By Jimmy Wang
        </Footer>
      </Layout>
    </Layout>
  );
}
