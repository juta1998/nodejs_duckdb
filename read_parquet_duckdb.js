// read.js
const { query } = require('./loaddata');
(async () => {
  console.time('q');
  const rows = await query();
  console.log(rows)
  console.timeEnd('q');           // زمان واقعی در ms
})();