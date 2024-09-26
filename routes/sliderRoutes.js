const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const SliderController = require("../controllers/sliderController");

// @desc Create a new slider
// @route POST /api/sliders
router.post("/sliders", protect, SliderController.createSlider);

// @desc Get all sliders
// @route GET /api/sliders
router.get("/sliders", SliderController.getSliders);

// @desc Update a slider
// @route PUT /api/sliders/:id
router.put("/sliders/:id", protect, SliderController.updateSlider);

// @desc Delete a slider
// @route DELETE /api/sliders/:id
router.delete("/sliders/:id", protect, SliderController.deleteSlider);

module.exports = router;
