import { Menu } from "antd";
import {
  NotificationOutlined,
  CloudServerOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  SettingOutlined
} from "@ant-design/icons";

const routes = [
  {
    name: "Recent",
    path: "/Admin/Recents",
    icon: <NotificationOutlined />
  },
  {
    name: "Students",
    path: "/Admin/Students",
    icon: <UserOutlined />
  },
  {
    name: "Classes",
    path: "/Admin/Classes",
    icon: <TeamOutlined />
  },
  {
    name: "Assignments",
    path: "/Admin/Assignments",
    icon: <FileOutlined />
  },
  {
    name: "Server Status",
    path: "/Admin/Server",
    icon: <CloudServerOutlined />
  },
  {
    name: "Settings",
    path: "/Admin/Settings",
    icon: <SettingOutlined />
  }
];

export default function RenderRoutes() {
  return <>
    {routes.map((route) => {
      return (
        <Menu.Item key={route.path.split("/")[2]} icon={route.icon}>
          {route.name}
        </Menu.Item>
      );
    })}
    </>
}