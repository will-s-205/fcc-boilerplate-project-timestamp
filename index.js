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
  // An empty date parameter should return the current time in a JSON object with a utc key
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  // Your project can handle dates that can be successfully parsed by new Date(date_string)
  // Based on input variables below will be reassigned by if, else if, else statements
  let date_string = req.params.date;
  let unix, utc;

  if (date_string instanceof Date) {
    utc = date_string.toUTCString();
    unix = date_string.getTime();

    // A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
  } else if (!isNaN(date_string)) {
    unix = parseInt(date_string);
    date_string = new Date(unix);
    utc = date_string.toUTCString();

    // A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)
    // A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
  } else {
    date_string = new Date(date_string);
    utc = date_string.toUTCString();
    unix = date_string.getTime();
  }

  if (utc == "Invalid Date") {
    console.log("Error");
    // If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
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