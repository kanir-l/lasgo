const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promis = global.Promise

const PicksSchema = new Schema({
    thisAndthat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "thisandthats",
    },
    picked: { type: String }
})

const PicksModel = mongoose.models.picks || mongoose.model('picks', PicksSchema)

module.exports = PicksModel;