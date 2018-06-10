require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("axios");

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const token = process.env.API_KEY;

const app = express();

app.listen(port, () => {
  console.log(`app is running on http://${host}:${port}`);
});

// config middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(_, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:1234");
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

// getGifs route
app.get("/getGifs", (req, res, next) => {
  return request
    .get(`http://api.giphy.com/v1/stickers/trending?limit=200&api_key=${token}`)
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

// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  region: "eu-west-2",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });

// getItems route
app.get("/getScores", (req, res, next) => {
  const params = {
    TableName: "GifSetMatch-Scoreboard"
  };
  ddb.scan(params, (err, data) => {
    if (err) {
      console.log("Error", err);
      res.json({
        error: "database error"
      });
    } else {
      res.json({
        responseData: data
      });
      console.log("Success", data);
    }
  });
});

// // add new item to make
// app.post("/postItem", (req, res, next) => {
//   ddb.putItem(
//     req.body,
//     (err, data) =>
//       err
//         ? res.status(500).json({ error: err.message })
//         : console.log("Successfully added data")
//   );
// });
