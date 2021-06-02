import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import cookie from 'cookie'

import MenuItems from '../menuItems/Admin';

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

export default function App({ children }) {
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
          background: "white"
        }}
      >
        <Menu theme="light" defaultSelectedKeys={[]} selectedKeys={[]} mode="inline">
          <MenuItems />
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
            {children}
          </div>
        </Content>
      </Layout>
      <style>{`
        .ant-layout-sider-trigger {
          position: absolute;
        }
      `}</style>
    </Layout>
  );
}
