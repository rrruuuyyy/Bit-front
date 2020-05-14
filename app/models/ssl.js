const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema


const SslSchema = new mongoose.Schema(
    {
        user_id: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        }
    },
    {
        name: {
        type: String,
        required: true
        }    
    },
    {
        name_file: {
            type: String,
            required: true
        }          
    },
    {
        password_file: {
            type: String,
            required: true
        }         
    },
    {
        versionKey: false,
        timestamps: true
    }
)
SslSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Ssl', SslSchema)