const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
});

module.exports = mongoose.model('Film', FilmSchema);
