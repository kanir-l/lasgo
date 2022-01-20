const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promis = global.Promise
const ProfileModel = require('./ProfileSchema')
const AcknowledgementModel = require('./AcknowledgementSchema')


const ChallengeSchema = new Schema({
    challengeThis: { type: String, minlength: 2, maxlength: 30 },
    challengeThat: { type: String, minlength: 2, maxlength: 30 },
    created: { type: Date },
    byUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    }
})

// Model function to automatically save in the profile when this challenge is created byUserId
ChallengeSchema.post('save', true, async function(next) {
    const self = this
    try {
        // Changed from ProfileModel to models.profile - caused by circular dependenies
        await mongoose.models.profile.updateOne(
            { _id: self.byUser },
            { $push: { myChallenges: self._id } },
            next
        )
    } catch (error) {
        console.error(error);
    }
})
// Model function to automatically remove from the profile when this challenge is removed 
ChallengeSchema.pre('remove', async function(next) {
    const self = this
    try {
        // Changed from ProfileModel to models.profile - caused by circular dependenies
        await mongoose.models.profile.updateMany(
            { $or: [
                { myChallenges: self._id },
                { myAcknowledgements: self._id },
            ]},
            { $pull: { 
                myChallenges: self._id, 
                myAcknowledgements: self._id 
            }}, 
            { multi: true }, 
            next
        ).clone()
    } catch (error) {
        console.error(error)
    }
})
// Model function to automatically remove from the profile when this acknowledgement is removed 
ChallengeSchema.pre('remove', async function(next) {
    const self = this
    try {
        await AcknowledgementModel.deleteMany(
            { challenge: self._id },
            next
        ).clone()
    } catch (error) {
        console.log(error)
    }
})

const ChallengeModel = mongoose.models.challenge || mongoose.model('challenge', ChallengeSchema)

module.exports = ChallengeModel;