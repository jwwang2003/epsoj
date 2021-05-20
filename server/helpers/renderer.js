import fs from "fs";
import path from "path";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { renderRoutes } from "react-router-config";
import Routes from "../../client/Routes";

export default (req) => {
  const content = renderToString(
    <StaticRouter location={req.path}>{renderRoutes(Routes)}</StaticRouter>
  );
  const data = fs.readFileSync(
    path.join(__dirname, "../dist/index.html"),
    "utf8"
  );
  return data.replace(
    '<div id="root"></div>',
    `<div id="root">${content}</div>`
  );
};
