import MainLayout from "../components/global/layout";

import "antd/dist/antd.css";
import "../styles/global.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
