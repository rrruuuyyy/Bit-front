const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')


const CredentialBitninjaSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
        type: String,
        required: true
    },
      type: {
        type: String,
        required: true
    }
  },
  {
    versionKey: false,  
    timestamps: true
  }
)
CredentialBitninjaSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('CredentialBitninja', CredentialBitninjaSchema)