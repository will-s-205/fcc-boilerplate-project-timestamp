// index.js
// where your node app starts

// init project
require('dotenv').config(); // for local env vars
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');

app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  const date = new Date();

  // debug
  unix = date.toUTCString();
  utc = date.getTime();
  console.log({ date, utc, unix });

  // An empty date parameter returns the current time in a JSON object with a unix key and utc
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  let date = req.params.date;
  let unix, utc;

  if (date instanceof Date) {
    utc = date.toUTCString();
    unix = date.getTime();

  } else if (!isNaN(date)) {
    unix = parseInt(date);
    date = new Date(unix);
    utc = date.toUTCString();

  } else {
    date = new Date(date);
    utc = date.toUTCString();
    unix = date.getTime();
  }

  if (utc == "Invalid Date") {
    console.log("Error");
    res.json({
      error: "Invalid Date",
    });
  } else {
    res.json({ unix, utc });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  // console.log(`server live now on http://localhost:${process.env.PORT}`) // env var for local runs on PORT=8080
});