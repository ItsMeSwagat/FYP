const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const TopBanner = require("../models/topBannerModel")


// Create or update the banner
const createOrUpdateBanner = catchAsyncErrors(async (req, res, next) => {
    let topBanner = await TopBanner.findOne();

    if (!topBanner) {
        // If no banner exists, create a new one
        topBanner = await TopBanner.create(req.body);
    } else {
        // If a banner already exists, update it
        topBanner = await TopBanner.findOneAndUpdate({}, req.body, {
            new: true, // Return the updated document
            runValidators: true // Run validators on update
        });
    }

    res.status(200).json({
        success: true,
        topBanner
    });
});

module.exports = {
    createOrUpdateBanner
}