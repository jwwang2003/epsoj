import { useState } from 'react';
import { message, Layout, Typography, Form, Input, Button, Checkbox, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Footer, Content } = Layout;
const { Text, Link, Paragraph } = Typography;



export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export async function getServerSideProps({ req, res }) {
  // Get the user's session based on the request
  // res.cookie('cookieName','allahu akbar', { maxAge: 1000, httpOnly: false });

  console.log(req.cookies);

  if (req.cookies.auth) {
    const token = await jwt.decode(JSON.parse(req.cookies.auth), {
      json: true,
    });
    console.log(token);
    if (token.type === "admin") {
      return {
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/app",
          permanent: false,
        },
      };
    }
  } else {
    return {
      props: {},
    };
  }
}

export default function Home(props) {
  console.log(props.child);
  return (
    <Layout className="layout-base">
      
    </Layout>
  );
}

