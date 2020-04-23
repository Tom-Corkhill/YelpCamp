var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Salmon Creek", image:"https://www.talk-business.co.uk/wp-content/uploads/2020/01/shutterstock_587557163.jpg"},
    {name: "Granite Hill", image:"https://www.lakedistrict.gov.uk/__data/assets/image/0021/134238/iStock-Camping-517043607.jpg"},
    {name: "Mountain Goat's Rest", image:"https://res.cloudinary.com/jnto/image/upload/w_750,h_503,fl_lossy,f_auto/v1531813728/fujiguide/SG011_2"}
]

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.get("/campgrounds/new", function(req, res){
    res.render("new");
})

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
})

app.listen(3000, function(){});