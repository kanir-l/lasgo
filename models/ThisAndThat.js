const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promis = global.Promise

const ThisAndThatSchema = new Schema({
    challengeThis: { type: String, minlength: 2, maxlength: 30 },
    challengeThat: { type: String, minlength: 2, maxlength: 30 },
    created: { type: Date },
    byUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    }
})

const ThisAndThatModel = mongoose.models.thisandthats || mongoose.model('thisandthats', ThisAndThatSchema)

module.exports = ThisAndThatModel;