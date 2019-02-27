var express = require("express");
var router  = express.Router();
var Ground = require("../models/ground");
var middleware = require("../middleware");


// INDEX
router.get("/", function(req, res) {
    
        Ground.find({},function(err, allgrounds) {
            if(err) {
                console.log(err);
            } else {
                res.render("grounds/index", {grounds: allgrounds});
            }
        });
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req,res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newGround = {name: name,price: price, image: image, description: desc, author: author};
    Ground.create(newGround, function(err, newCreated) {
        if(err){
            console.log(err);
        } else {
            res.redirect("/grounds");
        }
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("grounds/new"); 
});

// SHOW
router.get("/:id", function(req,res) {
    Ground.findById(req.params.id).populate("comments").exec(function(err, foundGround){
        if(err) {
            console.log(err);
        } else {
            res.render("grounds/show", {ground: foundGround});
        }
    });
});


router.get("/:id/edit", middleware.checkGroundOwnership, function(req, res) {
    Ground.findById(req.params.id, function(err, foundGround) {
        res.render("grounds/edit", {ground: foundGround});
    
        });
});


router.put("/:id", middleware.checkGroundOwnership, function(req, res) {
   Ground.findByIdAndUpdate(req.params.id, req.body.ground, function(err, updatedGround) {
       if(err) {
           res.redirect("/grounds");
       } else {
           res.redirect("/grounds/" + req.params.id);
       }
   }) ;
});



router.delete("/:id", middleware.checkGroundOwnership, function(req, res) {
   Ground.findByIdAndRemove(req.params.id, function(err) {
       if(err) {
           res.redirect("/grounds");
       } else {
           res.redirect("/grounds");
       }
   }) ;
});



module.exports = router;



