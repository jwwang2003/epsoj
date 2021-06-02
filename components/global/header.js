import Link from "next/link";
import { Layout } from "antd";
import React from "react";

const { Header } = Layout;

export default function header() {
  const [admin, setAdmin] = React.useState(false);
  const [student, setStudent] = React.useState(false);

  React.useEffect(() => {
    setStudent(window.location.href.includes("/App"));
    setAdmin(window.location.href.includes("/Admin"));
  }, []);

  return (
    <Header className="layout-main" style={{ display: "flex", flexDirection: "row" }}>
      <h1 style={{ color: "white" }}>EPSOJ {admin ? "ADMIN" : false}</h1>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        {!admin && !student ? (
          <Link href="/Login">
            <a>Login</a>
          </Link>
        ) : (
          <Link href="/">
            <a>Logout</a>
          </Link>
        )}
        <Link href="/about">
          <a>About</a>
        </Link>
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
