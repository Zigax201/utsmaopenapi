const express = require('express');
const db = require('../db');

const app = express.Router();

app.get('/', (req, res, next) => {
  res.json({ test: 'test' });
});

app.get("/all", async (req, res, next) => {
  try {
    let result = await db.all();
    var karyawan = {
      name: "ambilGaji",
      description: "get gaji dari data karyawan",
      properties: {result}
    };
    res.status(200).json(karyawan, [
      {
        rel: "self",
        method: "GET",
        href: "http://localhost/api/all"
      },
      {
        rel: "GET",
        method: "GET",
        title: "Ambil Gaji Karyawan",
        href: "http://localhost/api/gaji/{id}",
      },
    ]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

app.post('/create', async (req, res, next) => {
  try {
      let result = await db.create(req.body.nim, req.body.nama, req.body.umur, req.body.lulus);
      res.status(200).json({"result" : "Notes Succesfully Create", result});
  } catch (e) {
      console.log(e);
      res.sendStatus(500);
  }
});

module.exports = app;