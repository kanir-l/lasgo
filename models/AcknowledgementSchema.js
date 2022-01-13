const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promis = global.Promise
const ProfileModel = require('./ProfileSchema')

const AcknowledgementSchema = new Schema({
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "challenges",
    },
    picked: { type: String },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    }
})

// Model functions
AcknowledgementSchema.post('save', true, async function(next) {
    const self = this
    try {
        await ProfileModel.updateOne(
            { _id: self.by },
            { $push: { myAcknowledgements: self._id } },
            next
        )
    } catch (error) {
        console.error(error);
    }
})

AcknowledgementSchema.pre('remove', async function(next) {
    const self = this
    try {
        await ProfileModel.updateMany(
            { $or: [
                { myAcknowledgements: self._id },
            ]},
            { $pull: { 
                myAcknowledgements: self._id 
            }}, 
            { multi: true }, 
            next
        ).clone()
    } catch (error) {
        console.error(error)
    }
})

const AcknowledgementModel = mongoose.models.acknowledgement || (mongoose.model('acknowledgement', AcknowledgementSchema))

module.exports = AcknowledgementModel;