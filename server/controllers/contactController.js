const Contact = require('../models/Contact');

// @desc    Submit a contact enquiry
// @route   POST /api/contact
// @access  Public
const createContactEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'Please complete all required fields in the enquiry form' });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
      status: 'new',
    });

    res.status(201).json({
      message: 'Your message has been received! Our team in Ahmedabad will get back to you within 2 hours.',
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact enquiries (Admin)
// @route   GET /api/admin/contact
// @access  Private/Admin
const getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Contact.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status (Admin)
// @route   PUT /api/admin/contact/:id/status
// @access  Private/Admin
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const enquiry = await Contact.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    enquiry.status = status || enquiry.status;
    await enquiry.save();

    res.json({ message: `Enquiry status updated to ${enquiry.status}`, enquiry });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContactEnquiry,
  getEnquiries,
  updateEnquiryStatus,
};
