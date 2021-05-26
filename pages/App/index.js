import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  FileOutlined,
  NotificationOutlined
} from "@ant-design/icons";
import { Switch, Route, Link, useLocation } from "react-router-dom";

const { Content, Footer, Sider } = Layout;

export default function App() {
  const location = useLocation();
  const [collapse, setCollapse] = useState(false);
  const [crumbs, setCrumbs] = useState([]);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  React.useEffect(() => {
    let temp = location.pathname.split("/");
    temp.shift();
    setCrumbs(temp);
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider
        collapsible
        collapsed={collapse}
        onCollapse={handleCollapse}
        style={{ background: "white" }}
      >
        <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<NotificationOutlined />}>
            <Link to="/App/Recents">Recent</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileOutlined />}>
            <Link to="/App/Assignments">Assignments</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/App/Me">Me</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {crumbs.map((crumb) => (
              <Breadcrumb.Item>{crumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{ height: "100%" }}>
            <Switch>
              <Route path="/App/Recents">Recents</Route>
              <Route path="/App/Assignments">Assignments</Route>
              <Route path="/App/Me">Me</Route>
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
