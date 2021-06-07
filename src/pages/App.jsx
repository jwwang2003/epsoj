import { h } from "preact";
import Template from "../components/template";

import {
  NotificationOutlined,
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons";

const routes = [
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
]

export default function App() {
  return <Template routes={routes} />
}
