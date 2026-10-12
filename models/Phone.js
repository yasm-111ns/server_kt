const mongoose = require("mongoose")

const phoneSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Название обязательно!"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Описание обязательно!"],
        trim: true

    },
    price: {
        type: Number,
        required: [true, "Цена обязательна!"],
        min: 0
    },
    model: {
        type: String,
        required: [true, "обязательно!"],
        trim: true
    }
})

module.exports = mongoose.model('Phone', phoneSchema)