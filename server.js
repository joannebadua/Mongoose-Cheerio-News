/*/----------------------------------------
Setup
----------------------------------------/*/
var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
var db = require("./models/") //access to both models 

var PORT = 3000;

/*/----------------------------------------
Configuration
----------------------------------------/*/
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

/*/----------------------------------------
Routes
----------------------------------------/*/
app.get("/", function (req, res) {
//req for form, res is respond/shoot something to the google chrome
  //think we can do array with handlebars, and we can do for-each on the page
  //on the otherhand, we can do delete and update with ajax
  db.Lawmakers.find({})
    .populate("comments")
    .then(function (allLawmakers) {
      console.log(allLawmakers)
      //send the result of this query to the browser
      res.render('home', { Lawmakers: allLawmakers })
      //found is good from db
    })
    .catch(function (err) {
      // Log any errors if the server encounters one
      console.log(err)
    });
});
app.get("/saved", function (req, res) {
  db.Lawmakers.find({})
  .populate("comments")
  .then(function (allLawmakers) {
    console.log(allLawmakers)
    res.render('saved', { lawmakers: allLawmakers })
  });
})  
  //THIS GETS US ON LIVEWIRE! 
app.get("/scrape/lawmakers", function (req, res) {

  console.log("Scraping 2!");

axios.get("https://www.capitol.hawaii.gov/members/legislators.aspx?chamber=all")
  .then(function (response) {
    var $ = cheerio.load(response.data);
    var results = [];

    // $(".noU3").each(function (i, element) {
    //   var name = $(element).text();
    //   var name = $(element).text();
    //   var thingToSave = {
    //     name: name,
    //     link: $(element).attr("href"),
    //     phone: phone,
    //     email: email
    //   };
    //   db.Lawmakers.create(thingToSave)
    //     .then(function (stuffFromDb) {
    //       results.push(stuffFromDb)
    //     })
    // });
    var counter = 0;
    $('td').each(function (i, element) {
      var name = $(element).children('.noU3').text();
      if (name) {
        var phone = $(element).children('#ContentPlaceHolderCol1_GridView1_LabelPhone2_'+counter).text();
        counter++;
        console.log(name);
        console.log(phone);
      }
      var thingToSave = {
        name: name,
        phone: phone
      };
      db.Lawmakers.create(thingToSave)
      .then(function (stuffFromDb) {
        results.push(stuffFromDb)
      })
    });
    res.json(results)
  });
});

app.post("/comment/lawmakers/:id", function (req, res) {
  console.log("test")
  db.Comment.create(req.body)
    .then(function (newComment) {
      return db.Lawmakers.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: newComment._id } }, { new: true });
    })
    .then(function (lawmakers) {
      res.json(lawmakers)
    })
    .catch(function (err) {
      console.log(err)
    })
})

app.listen(3000, function () {
  console.log("website is on")
})