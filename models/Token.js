const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    userId: {
        type: String,
        ref:"user",
        required: true,
    },
    token:{
        type: String,
        requried: true,
    }
})
const Token = mongoose.model("token", tokenSchema);
module.exports = Token