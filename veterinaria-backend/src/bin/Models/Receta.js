const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const RecetaSchema = new Schema({
  medicamento: String,
  descripcion: String
});

var Receta = mongoose.model('Receta', RecetaSchema);

module.exports = Receta;