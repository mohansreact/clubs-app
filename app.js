var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Ground      = require("./models/ground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
var commentRoutes   =  require("./routes/comments"),
    groundRoutes    =  require("./routes/grounds"),
    indexRoutes     =  require("./routes/index");


// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/yelp_clubs",{ useNewUrlParser: true });
mongoose.connect("mongodb://mohan:mohan@clubs-shard-00-00-ycv6g.mongodb.net:27017,clubs-shard-00-01-ycv6g.mongodb.net:27017,clubs-shard-00-02-ycv6g.mongodb.net:27017/test?ssl=true&replicaSet=Clubs-shard-0&authSource=admin&retryWrites=true", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();


app.use(require("express-session")({
    secret: "Mes que un club",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error  =   req.flash("error");
    res.locals.success =  req.flash("success");
    next();
});


app.use("/", indexRoutes);
app.use("/grounds", groundRoutes);
app.use("/grounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpClubs server is Started!!!");
});




