import { h } from "preact";
import { Layout, Menu, Breadcrumb } from "antd";
import { useState, useEffect } from "preact/hooks";
import { Link, Switch, Route, Redirect, useLocation } from "react-router-dom";

const { Sider } = Layout;

export default function Template(props) {
  const { routes } = props;
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
    <Layout style={{ height: "inherit" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapsed}
        breakpoint="md"
        collapsedWidth="0"
      >
        <Menu selectedKeys={[paths[1]]} mode="inline">
          {routes
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
          <Switch location={location}>
            <Route path={`/${mode}`} exact>
              <Redirect to={`/${mode}/recents`} />
            </Route>
            {routes.map((route) => {
              if (route.component)
                return <Route path={route.path} component={route.component} />;
              else return <Route path={route.path}></Route>;
            })}
          </Switch>
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
