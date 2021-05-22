import React from 'react';
import { renderRoutes } from 'react-router-config';


function App ({ route }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])
  
  return <>{renderRoutes(route.routes)}</>
}

export default { component: App };