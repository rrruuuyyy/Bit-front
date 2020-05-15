const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema = mongoose.Schema


const DomainSchema = new mongoose.Schema(
    {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },
        path: {
            type: String,
            required: true
        },
    },
    {
        versionKey: false,
        timestamps: true
    }
)
DomainSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Domain', DomainSchema)