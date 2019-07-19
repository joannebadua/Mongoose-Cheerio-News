var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/hawaiiLawmakers", { useNewUrlParser: true });

axios.get("https://www.capitol.hawaii.gov/members/legislators.aspx?chamber=all").then(function(response) {
    var $ = cheerio.load(response.data);
    var results = [];
    $(".noU3").each(function(i, element) {
        var name = $(element).text();
        results.push({
            name: name,
            link: $(element).attr("href"),
          });
        });
        console.log(results);
      });      