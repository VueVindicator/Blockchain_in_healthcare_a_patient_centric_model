const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  patients: {
    items: [{
      patientID: {
        type: String,
        required: true
      },
      decryptionKey: {
        type: String,
        required: true
      },
    }]
  },
  notifications: {
    items:[{
      notification: {
        type: String,
        required: true
      },
      exptime: Date
    }]
  },
});

module.exports = mongoose.model('Doctor', userSchema);

