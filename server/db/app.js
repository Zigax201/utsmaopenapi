const pool = require('./connection');

let notesdb = {};

notesdb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM karyawan`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

notesdb.create = (nim, nama, umur, lulus) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO notes(nim, nama, umur, lulus) VALUES (?, ?, ?, ?)`, [nim, nama, umur, lulus] , (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = notesdb;