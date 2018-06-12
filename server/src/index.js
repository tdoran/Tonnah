require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("axios");
const path = require("path");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const token = process.env.API_KEY;

const app = express();

app.listen(port, () => {
  console.log(`app is running on http://${host}:${port}`);
});

app.disable("x-powered-by");

// config middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(_, res, next) {
  // res.header("Access-Control-Allow-Origin", "http://localhost:1234");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response;
};

app.use(express.static("./dist"));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../../dist", "index.html"));
});

// getGifs route
app.get("/getGifs", (req, res, next) => {
  return request
    .get(`http://api.giphy.com/v1/stickers/trending?limit=126&api_key=${token}`)
    .then(gifResponse => {
      // console.log("Success", gifResponse.data.data);
      res.json(JSON.stringify(gifResponse.data));
    })
    .catch(err => {
      console.log("error: ", err.message);
      return res.json({
        error: "request error"
      });
    });
});
