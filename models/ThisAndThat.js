const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promis = global.Promise
const ProfileModel = require('./ProfileSchema')

const ThisAndThatSchema = new Schema({
    challengeThis: { type: String, minlength: 2, maxlength: 30 },
    challengeThat: { type: String, minlength: 2, maxlength: 30 },
    created: { type: Date },
    byUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    }
})

// Model functions
ThisAndThatSchema.post('save', true, async function(next) {
    const self = this
    try {
        await ProfileModel.updateOne(
            { _id: self.byUser },
            { $push: { myChallenges: self._id } },
            next
        )
    } catch (error) {
        console.error(error);
    }
})

ThisAndThatSchema.pre('remove', async function(next) {
    const self = this
    try {
        await ProfileModel.updateMany(
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

const ThisAndThatModel = mongoose.models.thisandthats || mongoose.model('thisandthats', ThisAndThatSchema)

module.exports = ThisAndThatModel;