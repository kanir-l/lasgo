const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promis = global.Promise

const ThisAndThatSchema = new Schema({
    this: { type: String, minlength: 2, maxlength: 30 },
    that: { type: String, minlength: 2, maxlength: 30 },
    created: { type: Date },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    }
})

const ThisAndThatModel = mongoose.models.thisandthats || mongoose.model('thisandthats', ThisAndThatSchema)

module.exports = ThisAndThatModel;