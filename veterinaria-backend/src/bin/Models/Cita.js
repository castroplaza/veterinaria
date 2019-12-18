const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CitaSchema = new Schema({
  fecha: String,
  veterinario: {
    type: Schema.Types.ObjectId,
    ref: "Veterinario"
  },
  mascota: {
    type: Schema.Types.ObjectId,
    ref: "Mascota"
  },
  id_propietario:
    {
      type: Schema.Types.ObjectId,
      ref: "propietarios"
    }
  ,
  id_receta: [
    {
      type: Schema.Types.ObjectId,
      ref: "recetas"
    }
  ],
});

var Cita = mongoose.model('Cita', CitaSchema);

module.exports = Cita;