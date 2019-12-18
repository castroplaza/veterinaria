const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MascotaSchema = new Schema({
  nombre: String,
  edad: Number,
  raza: String,
  id_propietario: 
    {
      type: Schema.Types.ObjectId,
      ref: "propietarios"
    }
});

var Mascota = mongoose.model('Mascota', MascotaSchema);

module.exports = Mascota;