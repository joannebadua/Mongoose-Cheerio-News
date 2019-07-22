var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
var db = require("./models/") //access to both models 

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
// Parse request body as JSON
var exphbs = require("express-handlebars");
//configure view engine and set handlebars
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
//think we can do array with handlebars, and we can do for-each on the page
//on the otherhand, we can do delete and update with ajax
db.Lawmakers.find({})
.thenfunction(error, found) {
  // Log any errors if the server encounters one
  if (error) {
    console.log(error);
  }
  // Otherwise, send the result of this query to the browser
  else {
    res.render('home', { Lawmakers: found })
    //found is good from db
  }
});

})
app.get("/all-lawmakers", function(req, res) {
  //THIS GETS US ON LIVEWIRE! 
  //now mongoose stuff because we interact with the db
  //not connection.query like sql
  //we imported the model so we don't need to add db.Lawmakers

});

app.listen(3000, function(){
  console.log("website is on")
})