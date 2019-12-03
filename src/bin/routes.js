const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require ('cors');

app.use(bodyParser.json());
app.use(cors());

const { controller } = require('./Controller')

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
exports.app = app; 