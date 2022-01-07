const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promis = global.Promise

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

const ProfileModel = mongoose.models.profile || mongoose.model('profile', ProfileSchema)

module.exports = ProfileModel;