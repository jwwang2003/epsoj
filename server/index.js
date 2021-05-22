import express from 'express'
import path from 'path'
import expressStaticGzip from 'express-static-gzip'

import handleRender from "./helpers/renderer";

const app = express();

app.use(
  "/dist",
  expressStaticGzip(path.join(__dirname, "../dist"), {
    fallthrough: false,
    enableBrotli: true,
  })
);

// This is fired every time the server-side receives a request.
app.use(handleRender);

const port = 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on ${port}`);
});

