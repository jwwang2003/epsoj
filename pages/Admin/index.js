import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  NotificationOutlined,
  CloudServerOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  SettingOutlined
} from "@ant-design/icons";
import cookie from 'cookie'

import Students from '../../components/Students'
import Settings from '../../components/Settings'
import AddStudent from '../../components/AddStudent'

export async function getServerSideProps({ req, res }) {
  // Get the user's session based on the request
  // res.cookie('cookieName','allahu akbar', { maxAge: 1000, httpOnly: false });
  
  res.setHeader('Set-Cookie', cookie.serialize('name', String('test'), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 // 1 week
  }));

  if (false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  else {
    return {
      props: {}
    }
  }
}

const { Content, Footer, Sider } = Layout;

const routes = [
  {
    name: "Recent",
    path: "/Admin/Recents",
    icon: <NotificationOutlined />,
  },
  {
    name: "Students",
    path: "/Admin/Students",
    icon: <UserOutlined />,
    component: Students
  },
  {
    name: "Classes",
    path: "/Admin/Classes",
    icon: <TeamOutlined />,
  },
  {
    name: "Assignments",
    path: "/Admin/Assignments",
    icon: <FileOutlined />,
  },
  {
    name: "Server Status",
    path: "/Admin/Server",
    icon: <CloudServerOutlined />,
  },
  {
    name: "Settings",
    path: "/Admin/Settings",
    icon: <SettingOutlined />,
    component: Settings
  }
];

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [paths, setPaths] = useState([]);

  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        style={{ 
          background: "white",
          height: '100vh'
        }}
      >
        <Menu theme="light" defaultSelectedKeys={[]} selectedKeys={[]} mode="inline">
          {routes.map((route) => {
            return (
              <Menu.Item key={route.path.split("/")[2]} icon={route.icon}>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {paths.map((crumb) => (
              <Breadcrumb.Item key={crumb}>{crumb}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{ height: "100%" }}>

          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          EPSOJ ©2021 By Jimmy Wang
        </Footer>
      </Layout>
    </Layout>
  );
}
