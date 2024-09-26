const Slider = require("../models/Slider");

// @desc Create a new slider
// @route POST /api/sliders
const createSlider = async (req, res) => {
  const { image, title, subtitle } = req.body;

  try {
    const slider = await Slider.create({ image, title, subtitle });
    res.status(201).json(slider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get all sliders
// @route GET /api/sliders
const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Update a slider
// @route PUT /api/sliders/:id
const updateSlider = async (req, res) => {
  const { id } = req.params;

  try {
    const slider = await Slider.findByIdAndUpdate(id, req.body, { new: true });
    if (!slider) {
      return res.status(404).json({ error: "Slider not found" });
    }
    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Delete a slider
// @route DELETE /api/sliders/:id
const deleteSlider = async (req, res) => {
  const { id } = req.params;

  try {
    const slider = await Slider.findByIdAndDelete(id);
    if (!slider) {
      return res.status(404).json({ error: "Slider not found" });
    }
    res.status(200).json({ message: "Slider deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSlider,
  getSliders,
  updateSlider,
  deleteSlider,
};
