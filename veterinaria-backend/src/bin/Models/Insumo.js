const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const InsumoSchema = new Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  id_veterinario: {
    type: Schema.Types.ObjectId,
    ref: "Veterinario"
  }
});

var Insumo = mongoose.model('Insumo', InsumoSchema);

module.exports = Insumo;