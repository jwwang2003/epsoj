import {h} from "preact";
import { useState, useEffect } from "preact/hooks";
import { useHistory } from "react-router-dom";
import { message } from "antd"
import Layout from "antd/es/layout";
import Button from "antd/es/button";
import axios from "axios";

const { Header } = Layout;

export default function header() {
  const history = useHistory();
  const [admin, setAdmin] = useState(false);
  const [student, setStudent] = useState(false);

  useEffect(() => {
    setStudent(window.location.href.includes("/app"));
    setAdmin(window.location.href.includes("/admin"));
  }, [global.window && window.location.href]);

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
          message.success("Logout Success");
        }
      },
      (error) => {
        message.error(error.message);
      }
    );
  }

  return (
    <Header className="layout-main" style={{ display: "flex", flexDirection: "row" }}>
      <h1 style={{ color: "white" }}>EPSOJ {admin ? "ADMIN" : false } {student ? "STUDENT" : false }</h1>
      <nav>
        {!admin && !student ? false : (
          <Button onClick={handleLogout}>
            Logout
          </Button>
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
  )
}
