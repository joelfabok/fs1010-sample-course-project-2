import express from 'express'
import jwt from 'express-jwt'
import * as sign from './create'
import {v4 as uuidv4} from 'uuid'

const router = express.Router()

const signUp = (req, res, next) => {
    const body = req.body
    const invalid = []
    console.log(body)
    for (var property in body) {
        console.log(property)
        if (body[property] == null || body[property].length === 0) {
            invalid.push(property)
        }
    }
    const requiredProperties = ["name", "userName", "password"]
    requiredProperties.filter(prop => !body.hasOwnProperty(prop)).forEach(key => invalid.push(key))
    if (invalid.length > 0) {
        return res.status(400).send({message: "validation error", invalid})
    }
    next()
}

router.post('/', signUp, async (req, res) => {
    const body = req.body
    const newEntry = {id: uuidv4(), ...body}
    console.log(newEntry, req.body)
    await sign.add(newEntry)
    return res.send(newEntry)
})

router.delete('/', function (req, res) {
    res.send('Got a DELETE request at /user')
  })

router.use(jwt({secret: process.env.JWT_SECRET}))

router.get('/', async (req, res) => {
    res.send(await db.getAll())
})





export default router
