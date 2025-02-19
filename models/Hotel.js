const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

// Define Bookings schema
const BookingSchema = new mongoose.Schema({
  guestName: { type: String, required: false },
  checkIn: { type: Date, required: false },
  checkOut: { type: Date, required: false },
  bookedBy: { type: String, required: false },
  paymentDetails: {
    totalBill: { type: Number, required: false },
    advancePayment: { type: Number, required: false },
    duePayment: { type: Number, required: false },
    paymentMethod: { type: String, required: false },
    transactionId: { type: String, required: false },
  },
});

// Define RoomNumbers schema
const RoomNumberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bookedDates: { type: [String], required: false },
  bookings: [BookingSchema],
});

// Define RoomCategories schema
const RoomCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomNumbers: [RoomNumberSchema],
});

// Define Image schema
const ImageListSchema = new mongoose.Schema({
  image: { type: String },
});

// Define Hotel schema
const HotelSchema = new mongoose.Schema(
  {
    hotelName: { type: String, required: true },
    hotelID: { type: Number, required: true, unique: true },
    hotelDescription: { type: String, required: true },
    hotelImages: [ImageListSchema],
    roomCategories: [RoomCategorySchema], // Array of RoomCategorySchema
    price: { type: Number, required: true },

    // New Fields for Like & Rating
    likes: [
      {
        userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User reference
        isLiked: { type: Boolean, required: true },
        createdAt: { type: Date, default: Date.now }, // Add createdAt field for each like
      },
    ],

    ratings: [
      {
        userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User reference
        rating: { type: Number, min: 0, max: 5, required: true },
      },
    ],
    comments: [
      {
        userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        userName: { type: String, required: true },
        comment: { type: String, required: true },
        imageUrl: { type: String, required: true }, // User profile image
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createTime: { type: Date, default: Date.now },
  },
  { timestamps: true }
);


// Add auto-increment to the hotelID field
HotelSchema.plugin(autoIncrement, {
  inc_field: "hotelID",
  start_seq: 1,
});

// Export the Hotel model
module.exports = mongoose.model("Hotel", HotelSchema);
