const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PropietarioSchema = new Schema({
  email: String,
  password: String,
  nombre1: String,
  nombre2: String,
  apellido1: String,
  apellido2: String,
  direccion: String,
  identificacion: String,
  id_mascotas: [
    {
      type: Schema.Types.ObjectId,
      ref: "mascota"
    }
  ],
  id_cita: [
    {
      type: Schema.Types.ObjectId,
      ref: "citas"
    }
  ],
});

var Propietario = mongoose.model('Propietario', PropietarioSchema);

module.exports = Propietario;