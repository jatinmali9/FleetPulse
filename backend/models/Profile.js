const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  userType: {
    type: String,
    enum: ['User', 'Farmer', 'Driver', 'Customer'],
    required: true
  },
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  profileImage: String,
  address: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
  dateOfBirth: Date,
  gender: {
    type: String,
    default: null
  },
  bio: String,
  businessName: String,
  businessType: String,
  licenseNumber: String,
  licenseExpiry: Date,
  bankAccount: String,
  ifscCode: String,
  taxId: String,
  documents: [
    {
      name: String,
      url: String,
      uploadedAt: { type: Date, default: Date.now }
    }
  ],
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
