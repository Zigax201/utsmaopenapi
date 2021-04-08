const express = require('express');
const expressHateoasLinks = require("express-hateoas-links");
const apiRouter = require('./routes');

const app = express();

app.use(expressHateoasLinks);

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use('/api', apiRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port : ${process.env.PORT || '3000'}`);
});