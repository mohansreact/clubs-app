var Ground = require("../models/ground");
var Comment = require("../models/comment");


var middlewareObj = {};

middlewareObj.checkGroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
    Ground.findById(req.params.id, function(err, foundGround) {
        if(err) {
            res.redirect("back");
        } else {
            if(foundGround.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
        }
    });
    } else {
        req.flash("error", "you need to login for permission");
        res.redirect("back");
    }
 }



middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                 req.flash("error", "No Permission");
                res.redirect("back");
            }
        }
    });
        } else {
            req.flash("error", "You need to Login");
            res.redirect("back");
        }
    }



middlewareObj.isLoggedIn = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "LogIn first to do that!")
    res.redirect("/login");
}


module.exports = middlewareObj;