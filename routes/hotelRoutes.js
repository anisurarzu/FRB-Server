const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const HotelController = require("../controllers/hotelController");

// @desc Create a new hotel
// @route POST /api/hotel
router.post("/hotel", protect, HotelController.createHotel);

// @desc Get all hotels
// @route GET /api/hotel
router.get("/hotel", protect, HotelController.getHotel);
router.get("/getHotelsDropdown", HotelController.getHotelsDropdown);
//searchAvailableRooms
router.post("/hotel/search", HotelController.searchAvailableRooms);
//get all hotel list for web
router.get("/hotel/hotelList", HotelController.hotelsForWeb);
router.post("/hotel/like", HotelController.likeHotel);
router.post("/hotel/comment", HotelController.addHotelComment);


// Rate a hotel
router.post("/hotel/rate", HotelController.rateHotel);


// gt hotel rooms by hotel ID
router.get("/hotel/room/:id", HotelController.hotelRoomCategoryWiseByHotelID);

// @desc Update a hotel
// @route PUT /api/hotel/:id
router.put("/hotel/:id", protect, HotelController.updateHotel);

// @desc Update a booking in a specific room (now parameters are passed in the body)
// @route PUT /api/hotel/room/updateBooking
router.put("/hotel/room/updateBooking", protect, HotelController.updateBooking);

// @desc Delete a hotel
// @route DELETE /api/hotel/:id
router.delete("/hotel/:id", protect, HotelController.deleteHotel);
router.delete("/bookings/delete", HotelController?.deleteBookingDetails);

module.exports = router;