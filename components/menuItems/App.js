import { Menu } from "antd";
import {
  UserOutlined,
  FileOutlined,
  NotificationOutlined,
} from "@ant-design/icons";

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