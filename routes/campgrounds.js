var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Campground = require("../models/campground");
var axios = require("axios");

function geocode(req, res) {

    var location = req.body.address;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:location,
          key:process.env.API_KEY
        }
    }).then(function(response) {
        if(response.data.status === "OK") {
            var address = response.data.results[0].formatted_address;
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            var addressObject = {
                address, lat, lng
            }
            var name = req.body.name;
            var image = req.body.image;
            var desc = req.body.description;
            var author = {
                id: req.user._id,
                username: req.user.username
            };
            var price = req.body.price;
            var newCampground = {name: name, address: addressObject.address, lat:addressObject.lat, lng:addressObject.lng, image: image, description: desc, author: author, price: price};
            Campground.create(newCampground, function(err, newlyCreated){
                if(err) {
                    console.log(err);
                } else {
                    console.log(newlyCreated);
                    res.redirect("/campgrounds");
                }
            });
        } else {
            res.redirect("/campgrounds/new");
        }

    }).catch(function(error) {
        console.log(error);
    });
}




router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds,});
        }
    });
})

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
})

router.post("/", middleware.isLoggedIn, function(req, res){
    try {
        geocode(req, res);

    } catch (err) {
        console.log(err);
    }
});

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});





module.exports = router;