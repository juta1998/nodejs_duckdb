// loaddata.js  (نسخهٔ بهینه)
const duckdb = require('duckdb');
const fs = require('fs');

const db  = new duckdb.Database(':memory:');
const conn = db.connect();

const promisify = (fn) => (...args) =>
  new Promise((res, rej) => fn.call(conn, ...args, (err, x) => (err ? rej(err) : res(x))));
const run = promisify(conn.run);
const all = promisify(conn.all);

async function openDuck() {
  await run("INSTALL spatial");
  await run("LOAD spatial");

  // اگر parquet وجود نداشت فقط یک‌بار بساز
//   if (!fs.existsSync('book.parquet')) {
//     console.log('building parquet …');
//     await run(`
//       COPY (SELECT * FROM st_read('Book1.xlsx'))
//       TO 'book.parquet' (FORMAT PARQUET, COMPRESSION 'ZSTD')
//     `);
//   }

  await run("CREATE TABLE IF NOT EXISTS aire_port AS SELECT * FROM 'book.parquet'");
  return conn;
}

async function query() {
  await openDuck();
  return await all('SELECT index FROM aire_port LIMIT 100');
}

module.exports = { query };