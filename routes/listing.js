const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("E:/Web_AC/MajorProject/models/listing.js");
const {isLoggedIn} = require("E:/Web_AC/MajorProject/middleware.js");
const {isOwner, validateListing} = require("E:/Web_AC/MajorProject/middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync(listingController.index))

.post(
    isLoggedIn, 
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(listingController.create)
);

//new route
router.get("/new" , isLoggedIn,  listingController.new);

router
.route("/:id")
.get(wrapAsync(listingController.show))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.update))
.delete(isLoggedIn, isOwner,  wrapAsync(listingController.destroy));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner,   wrapAsync(listingController.edit));

module.exports = router;