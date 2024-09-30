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
