const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promis = global.Promise

const ProfileSchema = new Schema({
    image: { type: String },
    firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
    userName: { type: String, required: true, unique: true, minlength: 6, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    about: { type: String, minlength: 0, maxlength: 30 },
    accountCreated: { type: Date },
    tokenExpiration: { type: Date },
    myChallenges: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "thisandthats",
    }],
    myAcknowledgements: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "picks",
    }]
})

const ProfileModel = mongoose.models.profile || mongoose.model('profile', ProfileSchema)

module.exports = ProfileModel;