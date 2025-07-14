const mongoose = require("mongoose");

const permissionItemSchema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true,
    trim: true,
  },
  viewAccess: {
    type: Boolean,
    default: false,
  },
  editAccess: {
    type: Boolean,
    default: false,
  },
  deleteAccess: {
    type: Boolean,
    default: false,
  },
  insertAccess: {
    type: Boolean,
    default: false,
  },
});

const permissionSchema = new mongoose.Schema(
  {
    permissionName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    permissions: [permissionItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", permissionSchema);
