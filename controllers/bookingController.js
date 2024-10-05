const Booking = require("../models/Booking");

// Helper function to generate a new booking number
const generateBookingNo = async () => {
  const lastBooking = await Booking.findOne().sort({ createdAt: -1 });

  if (!lastBooking || !lastBooking.bookingNo) {
    return "FTB-01";
  }

  const lastBookingNo = lastBooking.bookingNo.split("-")[1];
  const nextBookingNo = (parseInt(lastBookingNo) + 1)
    .toString()
    .padStart(2, "0");

  return `FTB-${nextBookingNo}`;
};

// @desc Create a new booking
// @route POST /api/bookings
const createBooking = async (req, res) => {
  const bookingData = req.body;

  try {
    let bookingNo;

    // Check if the reference exists (i.e., the booking is associated with an existing bookingNo)
    if (bookingData.reference) {
      const referenceBooking = await Booking.findOne({
        bookingNo: bookingData.reference,
      });

      if (referenceBooking) {
        // Use the existing bookingNo from the reference
        bookingNo = referenceBooking.bookingNo;
      } else {
        // If the reference bookingNo does not exist, generate a new booking number
        bookingNo = await generateBookingNo();
      }
    } else {
      // Generate a new booking number if no reference is provided
      bookingNo = await generateBookingNo();
    }

    // Create the new booking with either the referenced or new bookingNo
    const booking = await Booking.create({ ...bookingData, bookingNo });

    res.status(200).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Update an existing booking
// @route PUT /api/bookings/:id
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const bookingData = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(id, bookingData, {
      new: true,
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc Get all bookings
// @route GET /api/bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get a single booking
// @route GET /api/bookings/:id
const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Delete a booking
// @route DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getBookings,
  getBookingById,
  deleteBooking,
};
