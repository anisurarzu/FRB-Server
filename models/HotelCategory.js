const mongoose = require("mongoose");

// Auto-increment for sequential ID
const autoIncrement = require("mongoose-sequence")(mongoose);

const HotelCategorySchema = new mongoose.Schema(
  {
    categoryID: {
      type: Number,
      unique: true, // Ensure that the ID is unique
    },
    categoryName: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
      required: true,
    },
    createTime: {
      type: Date,
      default: Date.now, // Automatically set the creation time
    },
  },
  { timestamps: true }
);

// Add auto-increment to the categoryID field
HotelCategorySchema.plugin(autoIncrement, {
  inc_field: "categoryID",
  start_seq: 0,
});

module.exports = mongoose.model("HotelCategory", HotelCategorySchema);
