var mongoose = require("mongoose");
var Ground = require("./models/ground");
var Comment = require("./models/comment");

var data = [
    {
        name: "CampNou",
        image: "https://fcbarcelona-static-files.s3.amazonaws.com/fcbarcelona/photo/2018/06/05/3ba57d13-21d3-4573-8595-20235304d4b1/13-14_wallpaper_camp-nou_001_cat.v1382006897.jpg",
        description: "Camp Nou is the home stadium of FC Barcelona since its completion in 1957. With a seating capacity of 99,354, it is the largest stadium in Spain and Europe"
    },
    {
        name: "Etihad",
        image: "https://mediacdn.mancity.com/-/media/images/home/news/club-news/2015/august/stadium-new.ashx?width=1024&height=576",
        description: "CoMS was renamed the Etihad Stadium, sponsored by Etihad Airways who fought off competition "
    },
    {
        name: "Anfield",
        image: "https://d3j2s6hdd6a7rg.cloudfront.net/v2/uploads/media/default/0001/28/thumb_27189_default_news_size_5.jpeg",
        description: "It's not just inside the stadium where work is ongoing at Anfield during the close season - and the latest batch of Anfield Forever stones have been laid outside"
    },
];

function seedDB() {
    Ground.remove({}, function(err) {
    if(err) {
        console.log(err);
    }
    console.log("ground removed!");
        
        data.forEach(function(seed) {
         Ground.create(seed, function(err, ground) {
             if(err) {
                 console.log(err);
             } else {
                 console.log("ground added");
                 Comment.create({
                     text: "this is some random text",
                     author: "unknown"
                 }, function(err, comment) {
                     if(err) {
                         console.log(err);
                     } else {
                        ground.comments.push(comment);
                        ground.save();
                        console.log("Created new comment");
                     }
                 });
             }
         });
      });
    });
}

module.exports = seedDB;




 