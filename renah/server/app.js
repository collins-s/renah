require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors");

// for level 5 encryption
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")

// level 6 
const findOrCreate = require("mongoose-findorcreate");
// const FacebookStrategy = require('passport-facebook').Strategy;

// Global variables
// let fbProfile, fbId, fbUserExists = false;

const app = express()

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))


const corsOption = {
    origin: [
        "http://localhost:3002/"
    ],
    // credentials: true,
    optionSuccessStatus: 200
}
app.options("*", cors())

app.use(cors(corsOption))
app.use(cors({methods: ["GET", "POST"]}))

// for level 5 encryption
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Mongodb connection
// const url = "mongodb://localhost:27017/renahDB"
const url = process.env.MONGOOSE_URL_ATLAS;
mongoose.connect(url)

// Mongoose Schemas
const cartSchema = new mongoose.Schema({
    productImg: String,
    productName: String,
    productPrice: Number,    
    quantity: {type: Number},
    size: {type: String},
    parentId: Number,
})
const userSchema = new mongoose.Schema({
    email: String,
    phoneNumber: String,
    fullName: String,    
    username: {type: String, required: false},
    password: {type: String, required: false},
    facebookId: String,
    cart: cartSchema
})
const subscribersSchema = new mongoose.Schema({
    email: String,
})
const productSchema = new mongoose.Schema({
    productImg: String,
    productName: String,
    productPrice: Number,
    rating: Number,
    sellerName: String,
    profileImg: String,
    category: String,
    Overview: String,
    Description: String,
    Policy: String,
    Feedback: String,
    discount: Number,
    otherImgs: [
        {
            img: String
        },
        {
            img: String
        },
        {
            img: String
        },
        {
            img: String
        },
        {
            img: String
        }
    ]
})

// for level 5 encryption
userSchema.plugin(passportLocalMongoose, {usernameQueryFields: ["email", "phoneNumber"]})

// for level 6 encryption
userSchema.plugin(findOrCreate)

const User =  mongoose.model("User", userSchema)
const Cart =  mongoose.model("Cart", userSchema)
const Subscriber =  mongoose.model("Subscriber", userSchema)
const Product =  mongoose.model("Product", userSchema)

// for level 5 encryption
passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// level 6 encryption


// *************************************************************************************************************************************************************************************************

// Home route
app.route("/")
    .get((req, res) => {
        // use the to check if the user is authenticated before granting access to homepage
        res.json({isAuthenticated: req.isAuthenticated()})
        // if isAuthenticated is true then give access

        console.log(req.user);
        console.log(req.accessToken);
        console.log(req.refreshToken);
    })
    .post((req, res) => {

    });

// Sign up route
app.route("/signup")
    .get((req, res) => {

    })
    .post((req, res) => {
        
        let email, phoneNumber;
        const { credentials, fullName, username, password } = req.body;
        const creds = Number(credentials)
        
        if (creds) {
            phoneNumber = credentials;
        } else {
            email = credentials;
        }

        User.register(
            {
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                fullName: fullName,
            }, 
            password, 
            (err, result) => {
            if(err) {
                console.log(err);
                res.redirect("/signup")
            } else {
                passport.authenticate("local") (req, res, () => {
                    // console.log("Registered!!!\n" + result.fullName);
                    res.redirect("/")
                })
            }
        })
        
    })

// Login route
app.route("/login")
    .get((req, res) => {
        // res.send("Login")
    })
    .post((req, res) => {

        const { username, password } = req.body;
        
        const user = new User({
            username: username,
            password: password
        })
        req.login(user, (err) => {
            if(err) {
                console.log(err);
            } else {
                passport.authenticate("local") (req, res, () => {
                    // console.log("Logged in successfully!!");
                    res.redirect("/")
                })
            }
        })
    })


app.route("/api/products")
    .get((req, res) => {
        Product.find((err, result) => {
            if(err){
                return res.status(200).json({success: false, err: err})
            }else {
                return res.status(200).json({success: true, data: result})

            }
        })
    })


port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server started on port " + port);
})