import db from './db.js';


let getEmp = (empId) => new Promise((res, rej) => {
  db.get(`SELECT * FROM employees Where id = ${empId};`, [], (err, row) => {
    if (err) {
      rej(err)
      return
    }
    if (!row) {
      rej("employee not exist")
      return
    }
    res(row)
  });
})


let addEmp = (empId, name, salary, job, address, phone) => new Promise((res, rej) => {
  db.run("INSERT INTO employees (id, name, salary, job, address, phone) VALUES (?, ?, ?, ?, ?, ?)",
    [empId, name, salary, job, address, phone],
    function (err) {
      if (err) {
        rej(err)
        return
      }
      const newId = empId ? empId : this.lastID
      res(newId)
    });
})



let getAllEmp = () => new Promise((res, rej) => {
  db.all(`SELECT * FROM employees;`, [], (err, rows) => {
    if (err) {
      rej(err)
      return
    }
    res(rows)
  });
})


let updateEmp = (empId, newData) => new Promise((res, rej) => {
  const updateQueryForEmp = newData.map(([k, v]) => `${k} = ${typeof v === 'string' ? `'${v}'` : v}`).join(", ")
  db.run(`UPDATE employees SET ${updateQueryForEmp} WHERE id = ${empId}`, [], (err) => {
    if (err) {
      rej(err)
      return
    }
    res("employee data have been updated")
  });
})



let deleteEmp = (empId) => new Promise((res, rej) => {
  db.run(`DELETE FROM employees Where id = ?;`, [empId], (err) => {
    if (err) {
      rej(err)
      return
    }
    res(`employee deleted with id : ${empId}`)
  });
})



export { getEmp, addEmp, getAllEmp, updateEmp, deleteEmp };
