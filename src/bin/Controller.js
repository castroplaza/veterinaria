const mongoose = require('mongoose');
const Propietario = require('./Models/Propietario');
const Cita = require('./Models/Cita')
const Servicio = require('./Models/Servicio')
const Veterinario = require('./Models/Veterinario')
const Insumo = require('./Models/Insumo')

class Controller {
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      await mongoose.connect(
        'mongodb+srv://orlando:castro@cluster0-jcmja.mongodb.net/veterinaria?retryWrites=true&w=majority', {
          useNewUrlParser: true
        }
      );
      console.log('Conectado a la DB')
    } catch (err) {
      console.log(err)
    }
  }
  getProps(res) {
    Propietario.find({}, (err, items) => {
      if (err) throw err;
      res.send(items)
    });
  }
  getProp(res, id) {
    Propietario.find({_id: id}, (err, item) => {
      if (err) throw err;
      res.send(item)
    })
  }
  createProp(res, datos) {
    Propietario.create(datos, function (err, newProp) {
      if (err) throw err;
      res.send({
        status: 200,
        nU: newProp
      });
    });
  }
  delProp(res, id) {
    Propietario.deleteOne({
      _id: id
    }, function (err) {
      if (err) throw err;
      res.send("Propietario eliminado.");
    });
  }
  setCita(res, id, cita) {
    cita.id_propietario = id
    Cita.create(cita, (err, newCita) => {
      if (err) throw err;
      res.send({
        status: 200,
        nU: newCita
      });
    })
  }
  delCita(res, citaId) {
    Cita.deleteOne({
      _id: citaId
    }, function (err) {
      if (err) throw err;
      res.send("Cita eliminada.");
    });
  }
  //

  setVeterinatio(res, vet) {
    Veterinario.create(vet, (err, newVet) => {
      if (err) throw err;
      res.send({
        status: 200,
        nU: newVet
      });
    })
  }
  //

  setServicio(res, serv) {
    Servicio.create(serv, (err, newServ) => {
      if (err) throw err;
      res.send({
        status: 200,
        nU: newServ
      });
    })
  }

  setInsumo(res, insumo) {
    Insumo.create(
      insumo, (err, newInsumo) => {
        if (err) throw err;
        res.send({
          msg: 'Insumo Creado',
          res: newInsumo
        })
      }
    )
  }
}

exports.controller = new Controller()