const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  patientID: {
    type: String,
    required: true
  },
  recordTitle: {
    type: String,
    required: true
  },
  recordBody: {
    type: String,
    required: true
  },
  time: Date
});

module.exports = mongoose.model('Record', recordSchema);

