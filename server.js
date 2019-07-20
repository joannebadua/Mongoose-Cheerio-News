var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
var LawmakersModel = require("./models/Lawmakers.js");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
// Parse request body as JSON
var exphbs = require("express-handlebars");
//configure and set handbars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/hawaiiLawmakers", { useNewUrlParser: true });

// axios.get("https://www.capitol.hawaii.gov/members/legislators.aspx?chamber=all").then(function(response) {
//     var $ = cheerio.load(response.data);
//     var results = [];
//     $(".noU3").each(function(i, element) {
//         var name = $(element).text();
//         var thingToSave = {
//             name: name,
//             link: $(element).attr("href"),
//           };
// LawmakersModel.create(thingToSave).then(function(stuffFromDb){
//   console.log("stuffFromDB", stuffFromDb)
// })
//         });
//         console.log(results);
//       });      
//routes
app.get("/home", function(req, res) {
//req for form, res is respond/shoot something to the google chrome
res.render("home")
})
app.listen(3000, function(){
  console.log("website is on")
})