const mongoose = require("mongoose");

// Define Booking schema
const BookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    nidPassport: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    roomCategoryID: {
      type: String,
      required: true,
    },
    roomCategoryName: {
      type: String,
      required: true,
    },
    roomNumberID: {
      type: String,
      required: true,
    },
    roomNumberName: {
      type: String,
      required: true,
    },
    roomPrice: {
      type: Number,
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    nights: {
      type: Number,
      required: true,
    },
    adults: {
      type: Number,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    totalBill: {
      type: Number,
      required: true,
    },
    advancePayment: {
      type: Number,
      required: true,
    },
    duePayment: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: false,
    },
    bookedBy: {
      type: String,
      required: true,
    },
    bookedByID: {
      type: String,
      required: true,
    },
    bookingID: {
      type: String,
      required: true,
    },
    bookingNo: {
      // Changed bookingID to bookingNo to match your logic
      type: String,
      required: true,
      // unique: true, // Ensure bookingNo is unique
    },
    reference: {
      type: String,
      required: false,
    },
    createTime: {
      type: Date,
      default: Date.now, // Automatically set the creation time
    },
  },
  { timestamps: true }
); // Automatically create createdAt and updatedAt fields

module.exports = mongoose.model("Booking", BookingSchema);
