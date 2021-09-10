const path = require('path');
const fs = require('fs');
const getAppDataPath = require("appdata-path");
const dir = getAppDataPath('BGChecker');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const Database = require('better-sqlite3');
const dbName = path.join(dir, 'heroes.db');
const createTable = "CREATE TABLE IF NOT EXISTS hero_status ('hero_id' int PRIMARY KEY, 'status' INT );"

const db = new Database(dbName);
db.exec(createTable);

const insert = db.prepare('REPLACE INTO hero_status (hero_id, status) VALUES (@hero_id, @status)');
const insertStatus = db.transaction((hero_id, status) => insert.run({ hero_id, status }));
const getStatus = (status = 1) => db.prepare('SELECT * FROM hero_status WHERE status = ' + status).all();

module.exports = {
  Database, dbName, db, getStatus, insertStatus
}