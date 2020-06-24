const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS favorito(
            image TEXT,
            name TEXT,
            language TEXT
        );
    `)
})

module.exports = db