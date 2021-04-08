// const express = require('express');
// const db = require('../db');
// const router = express.Router();

// router.get('/', async (req, res, next) => {

//     try {
//         let results = await db.all();
//         res.json({'result':results, links:[{href:'localhost:3000/api/chirps/1', href2:'localhost:3000/api/chirps/2'}]});
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }

// });

// router.get('/:id', async (req, res, next) => {

//     try {
//         let results = await db.one(req.params.id);
//         res.json({'result':results, links:{href:'localhost:3000/api/chirps'}});
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }

// });

// module.exports = router;

// var express = require('express');
// var app = express();
// var hateoasLinker = require('express-hateoas-links');

// // replace standard express res.json with the new version
// app.use(hateoasLinker);

// // standard express route
// app.get('/', function(req, res){

//     // create an example JSON Schema
//     var personSchema = {
//         "name": "Person",
//         "description": "This JSON Schema defines the parameters required to create a Person object",
//         "properties": {
//             "name": {
//                 "title": "Name",
//                 "description": "Please enter your full name",
//                 "type": "string",
//                 "maxLength": 30,
//                 "minLength": 1,
//                 "required": true
//             },
//             "jobTitle": {
//                 "title": "Job Title",
//                 "type": "string"
//             },
//             "telephone": {
//                 "title": "Telephone Number",
//                 "description": "Please enter telephone number including country code",
//                 "type": "string",
//                 "required": true
//             }
//         }
//     };

//     // call res.json as normal but pass second param as array of links
//     res.json(personSchema, [
//         { rel: "self", method: "GET", href: 'http://127.0.0.1' },
//         { rel: "create", method: "POST", title: 'Create Person', href: 'http://127.0.0.1/person' }
//     ]);
// });

// // express route to process the person creation
// app.post('/person', function(req, res){
//     // do some stuff with the person data
// });

const express = require("express");
const expressHateoasLinks = require("express-hateoas-links");
const dbConnect = require("../db/index");
const app = express();

app.use(expressHateoasLinks);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", function (request, response) {

  dbConnect.query("SELECT * FROM karyawan2 ", (err, result) => {
    if (err) {
      response.send("error");
    } else {
      var karyawanSchema = {
        name: "gajikaryawan",
        description:
          "get gaji karayawan",
        properties: {
          result,
        },

      };
      response.json(karyawanSchema, [
        { rel: "self", method: "GET", href: "http://127.0.0.1" },
        {
          rel: "GET",
          method: "GET",
          title: "GET GAJI KARYAWAN",
          href: "http://127.0.0.1",
        },
      ]);
    }
  });
});
app.listen(process.env.PORT || '3000', () => {

  console.log(`Server is running on port: ${process.env.PORT || '3000'}`);

});