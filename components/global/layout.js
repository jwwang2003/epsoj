import { Layout, Typography } from 'antd';
const { Content, Footer } = Layout;
import Header from './header';

const { Text, Link, Paragraph } = Typography;

export default function mainLayout({ children }) {
  return (
    <Layout className="layout-base">
      <Header />
      <Content style={{position: "relative"}}>
        {children}
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
  )
}