import express from 'express'
import { getEmp, addEmp, getAllEmp, updateEmp, deleteEmp } from './dbController.js'

const app = express()
app.use(express.json());


const validateParams = (params) => {
  for (const p in params) {
    if (!params[p]) {
      return p
    }
  }
  return null
}


// create new employee
app.post('/emp', async (req, res) => {
  const { id: empId, name, salary, job, address, phone } = req["body"]
  let isValidParams = validateParams({ name, salary, job })
  if (isValidParams) {
    res.status(400).send(`missing critical params : ${isValidParams}`)
    return
  }

  try {
    const newId = await addEmp(empId, name, salary, job, address, phone)
    res.status(201).send(`employee created with id : ${newId}`)
  } catch (error) {
    res.status(500).send(error)
  }
})


// update employee details
app.put('/emp', async (req, res) => {
  const { id: empId } = req["body"]
  let isValidParams = validateParams({ id: empId })
  if (isValidParams) {
    res.status(400).send(`missing employee id`)
    return
  }

  // check if user exist
  try {
    await getEmp(empId)
  } catch (error) {
    res.status(400).send(`${error} with this id : ${empId}`)
    return
  }

  // check if user sent any familiar field of employee for update
  const allowedFields = ['salary', 'job', 'address', 'phone'];
  const empNewData = Object.entries(req["body"]).filter(([k, v]) => allowedFields.includes(k))
  if (!(empNewData.length > 0)) {
    res.status(400).send(`please add valid data to update employee`)
    return
  }

  try {
    const resp = await updateEmp(empId, empNewData)
    res.status(200).send(resp)
  } catch (error) {
    res.status(500).send(error)
  }
})


// get employee by id
app.get('/emp', async (req, res) => {
  const { id: empId } = req['query']
  let isValidParams = validateParams({ id: empId })
  if (isValidParams) {
    res.status(400).send(`missing employee id`)
    return
  }

  try {
    let empData = await getEmp(empId)
    res.status(200).send(`employee details : ${JSON.stringify(empData)}`)
  } catch (error) {
    res.status(500).send(error)
  }
})


// delete employee by id
app.get('/delete_emp', async (req, res) => {
  const { id: empId } = req['query']
  let isValidParams = validateParams({ id: empId })
  if (isValidParams) {
    res.status(400).send(`missing employee id`)
    return
  }

  // check if user exist
  try {
    await getEmp(empId)
  } catch (error) {
    res.status(400).send(`${error} with this id : ${empId}`)
    return
  }

  try {
    let resp = await deleteEmp(empId)
    res.status(200).send(resp)
  } catch (error) {
    res.status(500).send(error)
  }
})



// get all employees
app.get('/all_emp', async (req, res) => {
  const employees = await getAllEmp()
  res.status(200).send(employees)
})




export default app;