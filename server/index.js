const path = require('path');
const express = require('express');
var expressStaticGzip = require('express-static-gzip');
var cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());

app.get(['/admin*', '/app*'], (req, res, next) => {
  // Protect secure content
  const { auth } = req.cookies;

  if(!auth) return res.redirect('/');
  else next();
});

app.use(expressStaticGzip("build", {
  enableBrotli: true
 }));

// app.use(express.static("build"));

app.get('*', function (request, response) {
  console.log(request.url);
  response.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(5000, () => console.log("start"));