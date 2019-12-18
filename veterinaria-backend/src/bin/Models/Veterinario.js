const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const VeterinarioSchema = new Schema({
  email: String,
  password: String,
  nombre1: String,
  nombre2: String,
  apellido1: String,
  apellido2: String,
  identificacion: String,
  especialidad: String,
  id_servicio: [
    {
      type: Schema.Types.ObjectId,
      ref: "servicios"
    }
  ]
});

var Veterinario = mongoose.model('Veterinario', VeterinarioSchema);

module.exports = Veterinario;