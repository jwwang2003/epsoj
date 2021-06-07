import { h } from "preact";
import Template from "../components/template";

import {
  NotificationOutlined,
  CloudServerOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import customLazy from "../components/customLazy";
const Students = customLazy(() =>
  import(/* webpackChunkName: "LAZY_Students" */ "./Admin/Students")
);
const AddStudents = customLazy(() =>
  import(/* webpackChunkName: "LAZY_AddStudents" */ "./Admin/AddStudents")
);
const Assignments = customLazy(() =>
  import(/* webpackChunkName: "LAZY_Assignments" */ "./Admin/Assignments")
);

const routes = [
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
];

export default function Admin() {
  return <Template routes={routes} />
}
