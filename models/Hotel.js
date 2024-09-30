const mongoose = require("mongoose");

// Auto-increment for sequential ID
const autoIncrement = require("mongoose-sequence")(mongoose);

// Define RoomNumbers schema
const RoomNumberSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Define RoomCategories schema
const RoomCategorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roomNumbers: [RoomNumberSchema], // Array of RoomNumberSchema
});

// Define Hotel schema
const HotelSchema = new mongoose.Schema(
  {
    hotelID: {
      type: Number,
      unique: true, // Ensure that the ID is unique
    },
    hotelName: {
      type: String,
      required: true,
    },
    hotelDescription: {
      type: String,
      required: true,
    },
    roomCategories: [RoomCategorySchema], // Array of RoomCategorySchema
    createTime: {
      type: Date,
      default: Date.now, // Automatically set the creation time
    },
  },
  { timestamps: true }
);

// Add auto-increment to the hotelID field
HotelSchema.plugin(autoIncrement, {
  inc_field: "hotelID",
  start_seq: 1,
});

module.exports = mongoose.model("Hotel", HotelSchema);
