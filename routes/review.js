const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("E:/Web_AC/MajorProject/models/review.js");
const Listing = require("E:/Web_AC/MajorProject/models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("E:/Web_AC/MajorProject/middleware.js");

const reviewController = require("../controllers/reviews.js");

//Reviews Post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete route for review

router.delete("/:reviewId", isLoggedIn, isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;