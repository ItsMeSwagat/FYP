const express = require("express");
const reviewController = require("../controller/reviewController");
const router = express.Router();
const { authenticateUser } = require("../middleware/authenticate");

router.put("/review", authenticateUser, reviewController.createReview);
router.get("/reviews", reviewController.getAllReviews);
router.delete("/reviews", authenticateUser, reviewController.deleteReview);

module.exports = router;
