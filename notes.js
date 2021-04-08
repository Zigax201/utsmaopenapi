const pool = require('./connection');

let notesdb = {};

notesdb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM notes`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

notesdb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM notes WHERE id = ?`, [id] ,(err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

notesdb.create = (title, body) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO notes(title, body) VALUES (?, ?)`, [title, body] , (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

notesdb.update = (id, title, body) => {
    return new Promise((resolve, reject) => {
        pool.query(`UPDATE notes SET title = ?, body = ?, updateAt = CURRENT_TIMESTAMP WHERE id = ?`, [title, body, id] , (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

notesdb.delete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM notes WHERE id = ?`, [id] , (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = notesdb;