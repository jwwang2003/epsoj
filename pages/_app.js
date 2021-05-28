import { Layout } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
const { Header, Content } = Layout;

import 'antd/dist/antd.css'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
  const [admin, setAdmin] = React.useState(false)

  React.useEffect(() => {
    setAdmin(window.location.href.includes('Admin'))
  })

  return (
    <Layout className="bigBox">
      <Header>
        <h1 style={{color: 'white'}}>EPS Online Judge {admin ? '(Admin)' : false}</h1>
      </Header>
      <Content>
        <div style={{height: '100%'}} suppressHydrationWarning>
          {typeof window === 'undefined' ? null : <Router><Component {...pageProps} /></Router>}
        </div>
      </Content>
    </Layout>
  )
}