const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promis = global.Promise
const AcknowledgementModel = require('./AcknowledgementSchema')
const ChallengeModel = require('./ChallengeSchema')

const ProfileSchema = new Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
    userName: { type: String, required: true, unique: true, minlength: 6, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountCreated: { type: Date },
    about: { type: String, minlength: 0, maxlength: 30 },
    image: { type: String },
    tokenExpiration: { type: Date },
    myChallenges: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "challenge",
    }],
    myAcknowledgements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "acknowledgement",
    }]
})

// Model function to automatically remove the challenges and acknowledgements made by this profile id when this profile id is deleted
ProfileSchema.pre('remove', async function(next) {
    const self = this
    try {
        await ChallengeModel.deleteMany(
            { byUser: self._id },
            next
        ).clone()
    } catch (error) {
        console.log(error)
    } 
    try {
        await AcknowledgementModel.deleteMany(
            { by: self._id },
            next
        ).clone()
    } catch (error) {
        console.log(error)
    } 
})

const ProfileModel = mongoose.models.profile || mongoose.model('profile', ProfileSchema)

module.exports = ProfileModel;