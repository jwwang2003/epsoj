import { h } from "preact";
import { useState } from "preact/hooks";
import { useHistory } from "react-router-dom";
import { message, Form, Input, Button, Checkbox, Spin } from "antd";
import axios from "axios";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const styleLogin = {
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function MainLogin() {
  return (
    <div style={styleLogin}>
      <Login />
    </div>
  );
}

function Login() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  // Handle login
  const onFinish = (values) => {
    setLoading(true);
    axios("http://localhost:8000/auth", {
      method: "post",
      data: {
        username: values.username,
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
          if (type === "admin") history.push("/admin");
          else history.push("/app");
          message.success("Authentication success");
        } else {
          if(result === 2) message.warning("User cannot be found");
          else if(result === 3) message.warning("Password incorrect");
          else message.warning("Internal server error")
        }
      },
      (error) => {
        setLoading(false);
        message.error(error.message);
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
          <Form.Item name="remember" valuePropName="unchecked" noStyle>
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
