const path = require("path");
const express = require("express");
var expressStaticGzip = require("express-static-gzip");
var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")

const app = express();
app.use(cookieParser());

app.get("/", (req, res, next) => {
  // Protect secure content
  const { auth } = req.cookies;
  const token = jwt.decode(auth);
  if (auth) return res.redirect(`/${token.type}`);
  else next();
});

app.get(["/admin*", "/app*"], (req, res, next) => {
  // Protect secure content
  const { auth } = req.cookies;

  if (!auth) return res.redirect("/");
  else next();
});

app.use(
  expressStaticGzip("build", {
    enableBrotli: true,
  })
);

app.get("*", function (request, response) {
  console.log(request.url);
  response.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(3000, () => console.log("start"));
