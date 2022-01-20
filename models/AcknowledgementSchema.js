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

// Model function to automatically save in the profile when acknowledgment is picked by the user
AcknowledgementSchema.post('save', true, async function(next) {
    const self = this
    try {
        // Changed from ProfileModel to models.profile - caused by circular dependenies
        await mongoose.models.profile.updateOne(
            { _id: self.by },
            { $push: { myAcknowledgements: self._id } },
            next
        )
    } catch (error) {
        console.error(error);
    }
})
// Model function to automatically remove from the profile when acknowledgment is removed 
AcknowledgementSchema.pre('remove', async function(next) {
    const self = this
    try {
        // Changed from ProfileModel to models.profile - caused by circular dependenies 
        await mongoose.models.profile.updateMany(
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