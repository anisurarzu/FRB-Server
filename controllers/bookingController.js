const Booking = require("../models/Booking");

// Helper function to generate a new booking number
const generateBookingNo = async () => {
  const currentDate = new Date();

  // Get current year, month, and day
  const year = currentDate.getFullYear().toString().slice(-2); // Last two digits of the year
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Month, zero-padded
  const day = currentDate.getDate().toString().padStart(2, "0"); // Day, zero-padded

  // Find the last booking
  const lastBooking = await Booking.findOne().sort({ createdAt: -1 });

  let nextSerialNo = "01"; // Default serial number

  if (lastBooking && lastBooking.bookingNo) {
    // Extract the last serial number from the last bookingNo (the last 2 digits)
    const lastBookingSerial = lastBooking.bookingNo.slice(-2);

    // Increment the serial number
    nextSerialNo = (parseInt(lastBookingSerial, 10) + 1)
      .toString()
      .padStart(2, "0");
  }

  // Combine everything into the new booking number format
  return `${year}${month}${day}${nextSerialNo}`;
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
    // Fetch and sort bookings
    const bookings = await Booking.find().sort({ createdAt: -1 });

    // Respond with bookings array
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Get multiple bookings by bookingNo
const getBookingsByBookingNo = async (req, res) => {
  const { bookingNo } = req.params;

  try {
    // Find all bookings that have the same bookingNo
    const bookings = await Booking.find({ bookingNo: bookingNo });

    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ error: "No bookings found for this booking number" });
    }

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
  getBookingsByBookingNo,
};
