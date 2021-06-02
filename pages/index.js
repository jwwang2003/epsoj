import { useState } from 'react';
import { message, Layout, Typography, Form, Input, Button, Checkbox, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Footer, Content } = Layout;
const { Text, Link, Paragraph } = Typography;

const styleLogin = {
  position: "absolute",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

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
      <Content style={{ position: "relative" }}>
        <div style={styleLogin}>
          <Login />
        </div>
      </Content>

      <Footer style={{ background: "rgb(220,220,220)" }}>
        <Typography>
          <Paragraph>
            <Text>Developed by Jimmy Wang</Text>
          </Paragraph>
          <Paragraph>
            <Link href="https://github.com/jwwang2003/epsoj" target="_blank">
              GitHub Repo
            </Link>
          </Paragraph>
        </Typography>
      </Footer>
    </Layout>
  );
}

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);
    axios("http://localhost:8000/auth", {
      method: "post",
      data: {
        username: values.studentID,
        password: values.password,
        remember: values.remember,
      },
      withCredentials: true,
    }).then(
      (response) => {
        setLoading(false);
        console.log(response.data);
        const { OK, result, type } = response.data;

        if (OK) {
          if (type === "admin") {
            router.push("/admin/recents");
          }
        }
      },
      (error) => {
        setLoading(false);
        message.error(error.message)
      }
    );
  };

  return (
    <Spin tip="Authenticating..." spinning={loading}>
      <Form
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please type your Username!" }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required!" }]}
        >
          <Input
            size="large"
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        <style>{`
        .login-form {
          width: clamp(250px, 50vw, 300px);
        }
        .login-form-forgot {
          float: right;
        }
        .ant-col-rtl .login-form-forgot {
          float: left;
        }
        .login-form-button {
          width: 100%;
        }
      `}</style>
      </Form>
    </Spin>
  );
}
