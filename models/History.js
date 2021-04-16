const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model('History', HistorySchema, 'history-entries')

//TODO refer the id to the user in the post request
