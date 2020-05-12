const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema

const ActionTakenSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    action_taken: {
      type: String,
      required: true
    }
  },
  {
    prev_data: {
      type: Object,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
ActionTakenSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('ActionTaken', ActionTakenSchema)
