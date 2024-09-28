const HotelCategory = require("../models/HotelCategory");

// @desc Create a new slider
// @route POST /api/sliders
const createHotelCategory = async (req, res) => {
  const { categoryName, categoryDescription } = req.body;

  try {
    const hotelCategory = await HotelCategory.create({
      categoryName,
      categoryDescription,
    });
    res.status(200).json(hotelCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get all sliders
// @route GET /api/sliders
const getHotelCategory = async (req, res) => {
  try {
    const hotelCategory = await HotelCategory.find();
    res.status(200).json(hotelCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Update a slider
// @route PUT /api/sliders/:id
const updateHotelCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const hotelCategory = await HotelCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!hotelCategory) {
      return res.status(404).json({ error: "Slider not found" });
    }
    res.status(200).json(hotelCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Delete a slider
// @route DELETE /api/sliders/:id
const deleteHotelCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const hotelCategory = await HotelCategory.findByIdAndDelete(id);
    if (!hotelCategory) {
      return res.status(404).json({ error: "Slider not found" });
    }
    res.status(200).json({ message: "Slider deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createHotelCategory,
  getHotelCategory,
  updateHotelCategory,
  deleteHotelCategory,
};
