"use strict";

var express = require("express");
var mongo = require("mongodb");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bodyParser = require("body-parser");
var dns = require("dns");

var cors = require("cors");

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var urlSchema = new Schema({
  originalUrl: { type: String, required: true }
});

var Url = mongoose.model("Url", urlSchema);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl/new", function(req, res, next) {
  let originalUrl = req.body.original_url;
  dns.lookup(originalUrl, function(err, addresses, family) {
    if (err) {
      res.json({ error: 'Invalid URL' });
    }

    let url = new Url({ originalUrl });

    url.save(function(err, data) {
      if (err) {
        res.send(err);
      }
      res.json({ data });
    });
  });
});

app.get("/api/shorturl/:id", function(req, res, next){
  const id = req.params.id;
  
  Url.findById(id, function(err, data){
    if(data){
      //
      res.redirect('https://'+ data.originalUrl);
    }else{
      res.json({ "error": "Invalid short URL" });
    }
  });
});

app.listen(port, function() {
  console.log("Node.js listening ...");
});
