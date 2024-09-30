const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const HotelController = require("../controllers/hotelController");

// @desc Create a new slider
// @route POST /api/sliders
router.post("/hotel", protect, HotelController.createHotel);

// @desc Get all sliders
// @route GET /api/sliders
router.get("/hotel", HotelController.getHotel);

// @desc Update a slider
// @route PUT /api/sliders/:id
router.put("/hotel/:id", protect, HotelController.updateHotel);

// @desc Delete a slider
// @route DELETE /api/sliders/:id
router.delete("/hotel/:id", protect, HotelController.deleteHotel);

module.exports = router;
