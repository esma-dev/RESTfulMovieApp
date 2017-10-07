const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//APP CONFIG ================================================================================

mongoose.connect("mongodb://localhost/restful_movie_app", {useMongoClient: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG ====================================================================
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number, 
  summary: String,
  image: String
});

const Movie = mongoose.model("Movie" , movieSchema);

//create a dummy document
// const movie01 = new Movie({
// 	title: "Titanic",
// 	year: 1997,
// 	summary: "James Cameron's 'Titanic' is an epic, action-packed romance set against the ill-fated maiden voyage of the R.M.S. Titanic; the pride and joy of the White Star Line and, at the time, the largest moving object ever built. She was the most luxurious liner of her era -- the 'ship of dreams' -- which ultimately carried over 1,500 people to their death in the ice cold waters of the North Atlantic in the early hours of April 15, 1912.",
// 	image: "https://upload.wikimedia.org/wikipedia/en/2/22/Titanic_poster.jpg"
// });

// movie01.save((err, movie) => {
// 	if (err) console.log('YOU HAVE AN ERROR!!!');
// 	else {
// 		console.log("MOVIE SAVED!!!");
// 	}
// })

// RESTful ROUTES ===========================================================================

//ROOT ROUTE
app.get("/", (req, res, next) => {
	res.redirect("/movies");
})

//INDEX ROUTE
app.get("/movies", (req, res, next) => {
	Movie.find({}, (err, moviesList) => {
		if(err) res.render("error");
		else {
			res.render("index", { moviesList });
		}
	})
})

app.listen(8080, () => {
	console.log("listening on port 8080!!!");
});