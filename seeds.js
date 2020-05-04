var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Clouds Rest",
        image: "https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        description: "Beautiful mate"
    },
    {
        name: "Desert Mesa",
        image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=647&q=80",
        description: "Beautiful mate"
    },
    {
        name: "Canyon Sky",
        image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
        description: "Beautiful mate"
    },
];

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        }
        console.log("Removed Campgrounds!");
        data.forEach(function(seed){
            //add a few campgrounds
            Campground.create(seed, function(err, campground){
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    // create a comment
                    Comment.create(
                        {
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comments");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;