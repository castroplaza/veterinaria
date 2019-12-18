const mongoose = require('mongoose');
const Propietario = require('./Models/Propietario');
const Cita = require('./Models/Cita')
const Servicio = require('./Models/Servicio')
const Veterinario = require('./Models/Veterinario')
const Insumo = require('./Models/Insumo')
const Mascota = require('./Models/Mascota')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  async loginP(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    const propietario = await Propietario.findOne({ email: email })
    // Check if user exists
    if (propietario == null) {
      return res.status(200).json({ message: "Email not found" });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, propietario.password)

    if (isMatch) {
      // User matched
      // Create JWT Payload
      let payload = {
        ...propietario
      }
      // console.log(propietario)
      // Sign token
      const token = jwt.sign(
        payload._doc,
        'secret',
        {
          expiresIn: 31556926 // 1 year in seconds
        },
      );

      console.log(token)

      res.json({
        success: true,
        token: token
      });
    } else {
      return res
        .status(200)
        .json({ message: "Password incorrect" });
    }


  }

  registerP(req, res){
    Propietario.findOne({ email: req.body.email }).then(propietario => {
      if (propietario) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        const newPropietario = new Propietario(req.body);
    // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPropietario.password, salt, (err, hash) => {
            if (err) throw err;
            newPropietario.password = hash;
            newPropietario
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }

  loginV(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    Veterinario.findOne({ email }).then(veterinario => {
      // Check if user exists
      if (!veterinario) {
        return res.status(404).json({ message: "Email not found" });
      }
    // Check password
      bcrypt.compare(password, veterinario.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            ...veterinario
          };
        // Sign token
          jwt.sign(
            payload._doc,
            'secret',
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ message: "Password incorrect" });
        }
      });
    });
  }

  registerV(req, res){
    Veterinario.findOne({ email: req.body.email }).then(veterinario => {
      if (veterinario) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newVeterinario = new Veterinario(req.body);
    // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newVeterinario.password, salt, (err, hash) => {
            if (err) throw err;
            newVeterinario.password = hash;
            newVeterinario
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
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
  setCita(res, cita) {
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

  getCitas(user, res){
    Cita.find({ id_propietario : user }, (err, items) => {
      if (err) throw err;
      res.send(items)
    });
  }

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

  getMascota(user, res){
    Mascota.find({ id_propietario : user }, (err, items) => {
      if (err) throw err;
      res.send(items)
    });
  }

  setMascota(req, res) {
    Mascota.create(req.body, function (err, newPet) {
      if (err) throw err;
      res.send({
        status: 200,
        nU: newPet
      });
    })
  }
}

exports.controller = new Controller()