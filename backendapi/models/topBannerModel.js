const mongoose = require("mongoose");

const topBannerSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
});

const topbanner = mongoose.model("TopBanner", topBannerSchema);
module.exports = topbanner;
