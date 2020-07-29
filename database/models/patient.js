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
  publicKey: {
    type: Object,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  secretPhrase: {
    type: Object,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  requests: {
    items: [{
      requestTime: {
        type: Number,
        required: true
      },
      requestSender: {
        type: String,
        required: true
      },
      requestInfo: {
        type: String,
        required: true
      },
      blockHash: {
        type: String,
        required: true
      }
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
  records: {
    items: [{
        recordID: {
          type: Schema.Types.ObjectId,
          ref: 'Record',
          required: true
        },
        senderID: {
          type: String,
          required: true
        }
    }]
  },
  doctors: {
    items: [{
      doctorID: {
        type: String,
        required: true
      }
    }]
  },
});

module.exports = mongoose.model('Patient', userSchema);

