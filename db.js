import sqlite3 from 'sqlite3'

const sql = sqlite3.verbose()

// create DB in memory
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


// create employees table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY,
      name TEXT,
      salary INTEGER,
      job TEXT,
      address TEXT,
      phone TEXT
    )
  `);
});



db.run(`INSERT INTO employees (name, salary, job) VALUES 
('leonardo', 1000, 'expert cook'),('donatelo', 3000, 'chef'),('rafael', 700, 'dish washer'),('michelangelo', 800, 'cook')`,
  [], (err) => {
    if (err) {
      throw new Error("couldn't insert values to DB")
    }
  });


// print initialized data in the DB
db.all(`SELECT * FROM employees;`, [], (err, rows) => {
  if (err) {
    throw new Error(err.message)
  }
  console.log("Employees List");
  rows.forEach(emp => {
    console.log(JSON.stringify(emp));
  });
});


export default db;

