const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  expiry: {
    type: Date,
    required: true,
    set: function (expiryDate) {
      return new Date(expiryDate).toISOString();
    },
  },
  discount: {
    type: Number,
    required: true,
  },
  discountType: {
    type: String,
    enum: ["percentage", "fixed"],
    required: true,
  },
});

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;
