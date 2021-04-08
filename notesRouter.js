const express = require('express');
const db = require('../db');

const notes = express.Router();

notes.get('/', (req, res, next) => {
    res.json({ test: 'test' });
});

function object(result, condition) {
    var arr = [];
    if(Object.keys(result).length > 1){
        result.forEach(element => {
            arr.push({
                href: '/api/notes/show/' + element.id
            })
        })
    } else {
        arr.push({
            href: '/api/notes/show/' + result.id
        })
    }
    var data = [];
    if (condition == 'get') {
        data.push({
            rel: "create",
            method: "POST",
            title: 'Create Notes',
            href: '/api/notes/show'
        },{
            rel: "update",
            method: "PUT",
            title: 'Update Notes',
            href: '/api/notes/show/'
        });
    } else {
        data.push({
            rel: "update",
            method: "PUT",
            title: 'Update Notes',
            href: '/api/notes/show/'
        });
    } 
    var _links = [{
        rel: "notes",
        method: "GET",
        title: 'Notes by Id',
        href: {
            arr
        }
    }, {
        data
    }];
    return _links;
}

notes.get('/show', async (req, res, next) => {
    try {
        let result = await db.all();
        res.status(200).json({
            result,
            _links: object(result, 'get')
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

notes.get('/show/:id', async (req, res, next) => {
    try {
        let result = await db.one(req.params.id);
        res.status(200).json({result,
            _links: object({id:result.id}, 'get')});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

notes.post('/show', async (req, res, next) => {
    try {
        let result = await db.create(req.body.title, req.body.body);
        res.status(200).json({"result" : "Notes Succesfully Create", _links: object({id:result.insertId}, 'post')});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

notes.put('/show/:id', async (req, res, next) => {
    try {
        db.update(req.params.id, req.body.title, req.body.body);
        res.status(200).json({"result" : "Notes Succesfully Edit", _links: object({id:req.params.id}, 'get')});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

notes.delete('/show/:id', async (req, res, next) => {
    try {
        let result = await db.delete(req.params.id);
        res.status(200).json({"result" : "Notes Succesfully Delete"});
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = notes;