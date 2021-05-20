import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from '../client/Routes';
import renderer from './helpers/renderer';

const app = express();

const port = process.env.PORT || 3001;

app.use(express.static('dist'));

app.get('*', (req, res) => {
  // const store = createStore();
  // const { dispatch } = store;
  const routes = matchRoutes(Routes, req.path);
  const promises = routes.map(
    ({ route, match }) => (route.loadData ? route.loadData(match) : null),
  );
  Promise.all(promises).then(() => {
    const content = renderer(req);

    res.send(content);
  });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
