import { Layout, Typography, Form, Input, Button, Checkbox, Spin } from "antd";
import axios from 'axios';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

const { Footer, Content } = Layout;
const { Text, Link, Paragraph } = Typography;

const styleLogin = {
  position: "absolute",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

export async function getServerSideProps({ req, res }) {
  // Get the user's session based on the request
  // res.cookie('cookieName','allahu akbar', { maxAge: 1000, httpOnly: false });
  
  console.log(req.cookies);

  if (req.cookies.auth) {
    const token = await jwt.decode(JSON.parse(req.cookies.auth), {json: true});
    console.log(token)
    if (token.type === "admin") {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      }
    } else {
      return {
        redirect: {
          destination: '/app',
          permanent: false,
        },
      }
    }
  } else {
    return {
      props: {}
    }
  }
}

export default function Home(props) {
  console.log(props.child)
  return (
    <Layout className="bigBox">
      <Content style={{ position: "relative" }}>
        <div style={styleLogin}>
          <Login />
        </div>
      </Content>

      <Footer style={{background: 'rgb(220,220,220)'}}>
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
  const router = useRouter();

  const onFinish = (values) => {
    console.log("Success:", values);
    axios('http://localhost:8000/auth', {
      method: "post",
      data: {
        username: values.studentID, 
        password: values.password,
        remember: values.remember
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response.data);
        const { OK, result, type } = response.data;
        

        if(OK) {
          if(type === "admin") {
            router.push("/admin/recents")
          }
        }

      }, (error) => {
        console.log(error);
      });
  };

  return (
    <Spin tip="Authenticating..." spinning={false}>
      <Form
        style={{
          width: "300px",
        }}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Student ID"
          name="studentID"
          rules={[
            {
              required: true,
              message: "Student ID is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
