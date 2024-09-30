const Hotel = require("../models/Hotel");

// Function to get the next sequential hotelID
const getNextHotelID = async () => {
  const lastHotel = await Hotel.findOne().sort({ hotelID: -1 });
  return lastHotel ? lastHotel.hotelID + 1 : 0; // If no category found, start from 0
};

// @desc Create a new hotel category
// @route POST /api/categories
const createHotel = async (req, res) => {
  const { hotelName, hotelDescription, roomCategories } = req.body;

  try {
    // Get the next hotelID
    const hotelID = await getNextHotelID();

    // Create the new category with createTime and hotelID
    const hotel = await Hotel.create({
      hotelID,
      hotelName,
      hotelDescription,
      roomCategories,
      createTime: new Date(), // Set the current time as createTime
    });

    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get all categories
// @route GET /api/categories
const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find();
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Update a category
// @route PUT /api/categories/:id
const updateHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!hotel) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// @desc Update room status in each category for a hotel
// @route PUT /api/hotels/:hotelID/roomCategories/:categoryID/roomStatus
const updateRoomStatus = async (req, res) => {
  const { hotelID, categoryID } = req.params;
  const { roomStatuses } = req.body; // Expecting roomStatuses as an array of objects [{ id: roomID, status: newStatus }]

  try {
    // Find the hotel by hotelID
    const hotel = await Hotel.findOne({ hotelID });
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    // Find the specific room category by categoryID
    const roomCategory = hotel.roomCategories.find(
      (category) => category.id === parseInt(categoryID)
    );
    if (!roomCategory) {
      return res.status(404).json({ error: "Room category not found" });
    }

    // Update the status of each room number in the category
    roomStatuses.forEach(({ id, status }) => {
      const roomNumber = roomCategory.roomNumbers.find(
        (room) => room.id === id
      );
      if (roomNumber) {
        roomNumber.status = status; // Update the status of the specific room
      }
    });

    // Save the updated hotel document
    await hotel.save();

    res
      .status(200)
      .json({ message: "Room statuses updated successfully", hotel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateRoomStatus,
};

// @desc Delete a category
// @route DELETE /api/categories/:id
const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findByIdAndDelete(id);
    if (!hotel) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHotel,
  getHotel,
  updateHotel,
  deleteHotel,
};
