/**
 * CRUD operations
 * adding a new expense -> /add-expense (post)
 * view existing ones -> /get-expenses (get)
 * edit existing entries -> /update-expense (patch)
 * deleting entries -> /delete-expense (delete)
 * 
 * adding a new user
 * validating existing user
 * 
 * monthly analysis
 */

const express = require('express')
const mongoose = require('mongoose')

const app = express()

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://shri:0000@cluster0.4xlmvfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("DB connection established :)")
        app.listen(8000, function() {
            console.log('Listening on port 8000...')
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish DB connection :(')
    }
}
connectToDb()
