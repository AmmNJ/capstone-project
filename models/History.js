const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema(
  {
    historyId: {
      type: Number,
      required: true,
    },
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

module.exports = mongoose.model('History', HistorySchema, 'history_entries')
