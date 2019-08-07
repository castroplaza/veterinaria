const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ServicioSchema = new Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  id_veterinario: [
    {
      type: Schema.Types.ObjectId,
      ref: "veterinarios"
    }
  ]
});

var Servicio = mongoose.model('Servicio', ServicioSchema);

module.exports = Servicio;