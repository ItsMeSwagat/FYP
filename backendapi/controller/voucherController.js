const Voucher = require("../models/voucherModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

//create voucher
const createVoucher = catchAsyncErrors(async (req, res) => {
  const vouchers = await Voucher.create(req.body);

  res.status(200).json({ success: true, vouchers });
});

//get all vouchers
const getAllVouchers = catchAsyncErrors(async (req, res) => {
  const vouchers = await Voucher.find();
  res.status(200).json({ success: true, vouchers });
});

//update vouchers
const updateVoucher = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const updateVoucher = await Voucher.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updateVoucher) {
    return next(new ErrorHandler("Voucher not found", 404));
  }

  res.status(200).json({ success: true, updateVoucher });
});

//delete vouchers
const deleteVoucher = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const deleteVoucher = await Voucher.findByIdAndDelete(id);

  if (!deleteVoucher) {
    return next(new ErrorHandler("Voucher not found", 404));
  }
  res.status(200).json({ success: true, deleteVoucher });
});

//getVoucher by id
const getVoucher = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  const getVoucher = await Voucher.findById(id);

  if (!getVoucher) {
    return next(new ErrorHandler("Voucher not found", 404));
  }

  res.status(200).json({ success: true, getVoucher });
});

module.exports = {
  createVoucher,
  getAllVouchers,
  updateVoucher,
  deleteVoucher,
  getVoucher,
};
