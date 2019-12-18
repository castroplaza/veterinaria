const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require ('cors');

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use(bodyParser.json());
app.use(cors());

const { controller } = require('./Controller')

app.post('/loginP', (req, res) => {
  controller.loginP(req, res)
})

app.post('/registerP', (req, res) => {
  controller.registerP(req, res)
})

app.post('/loginV', (req, res) => {
  controller.loginV(req, res)
})

app.post('/register', (req, res) => {
  controller.registerV(req, res)
})

app.get("/", (req, res) => {
  res.send("Inicio")
})

app.get("/propietarios", (req, res) => {
  controller.getProps(res);
})
app.get("/propietarios/:id", (req, res) => {
  let id = req.params.id
  controller.getProp(res, id);
})
app.post("/propietarios", (req, res) => {
  let datos = req.body.datos
  controller.createProp(res, datos)
})
app.delete("/propietarios/:id", (req, res) => {
  let id = req.params.id;
  controller.delProp(res, id);
})
//
app.post("/propietarios/:id/agendar-cita" ,(req, res) => {
  let id = req.params.id;
  let cita = req.body.cita;
  controller.setCita(res, id, cita);
})
app.delete("/propietarios/:id/cita/:citaId" ,(req, res) => {
  let citaId = req.params.citaId;
  controller.delCita(res, citaId);
})

//

app.post("/veterinarios", (req, res) => {
  let vet = req.body.vet;
  controller.setVeterinatio(res, vet);
})
app.post("/servicios/:idV", (req, res) => {
  let idV = req.params.idV;
  let serv = req.body.serv;
  serv.id_veterinario = idV;
  controller.setServicio(res, serv);
})


app.post("/insumos/:idV", (req, res) => {
  let insumo = req.body.insumo
  insumo.id_veterinario = req.params.idV
  controller.setInsumo(res, insumo);
})

app.post("/mascota", (req, res) => {
  controller.setMascota(req, res);
})

app.get("/mascota/:id", (req, res) => {
  user = req.params.id
  controller.getMascota(user, res);
})

app.get("/getCitas/:id", (req, res) => {
  user = req.params.id
  controller.getCitas(user, res);
})
exports.app = app; 