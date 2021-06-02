import { Layout } from 'antd';
const { Content } = Layout;
import Header from './header';

export default function mainLayout({ children }) {
  return (
    <Layout className="layout-base">
      <Header />
      <Content>
        {children}
      </Content>
    </Layout>
  )
}