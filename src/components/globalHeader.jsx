import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { useHistory, useLocation } from "react-router-dom";
import { Layout, Button, message } from "antd";
import axios from "axios";

const { Header } = Layout;

import logo from "../static/logo.png";

export default function header() {
  const location = useLocation();
  const history = useHistory();
  const [admin, setAdmin] = useState(false);
  const [student, setStudent] = useState(false);

  useEffect(() => {
    setStudent(location.pathname.includes("/app"));
    setAdmin(location.pathname.includes("admin"));
  }, [location.pathname]);

  const handleLogout = () => {
    axios("http://localhost:8000/auth/logout", {
      method: "post",
      data: {},
      withCredentials: true,
    }).then(
      (response) => {
        const { OK } = response.data;
        if (OK) {
          history.push("/");
          message.success("Logout success");
        }
      },
      (error) => {
        message.error(error.message);
      }
    );
  };

  return (
    <Header
      className="layout-main"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <img src={logo} style={{ margin: "0.8rem 0.4rem 0.8rem 0"}} />
      <h1 style={{ color: "white" }}>
        EPSOJ {admin ? "ADMIN" : false} {student ? "STUDENT" : false}
      </h1>
      <nav>
        {!admin && !student ? (
          false
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </nav>
      <style>{`
        .layout-main nav {
          margin-left: auto;
        }
        .layout-main a {
          margin-right: 0.5rem;
          white-space: nowrap;
        }
        .layout-main a:last-child {
          margin-right: 0;
        }
      `}</style>
    </Header>
  );
}
