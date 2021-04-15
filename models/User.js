const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    history_entries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History',
      },
    ],
  },
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model('User', UserSchema, 'users')
