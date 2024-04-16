/**
 * Functionalities of the application
 * End points
 * Express application
 * DB connection
 * Schema definition and creating a model
 */

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

/**
 * Database - Expense Tracker
 * Collections
 *      i) ExpenseDetails
 *          - amount (number)
 *          - category (string)
 *          - date (string)
 *      ii) UserDetails
 *          - username
 *          - emailID
 *          - password
 */

const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const { Expense, User } = require('./schema.js')

const app = express()
app.use(bodyParser.json())

async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://shri:0000@cluster0.4xlmvfd.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster0')
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

app.post('/add-expense', async function(request, response) {
    try {
        await Expense.create({
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date
        })
        response.status(201).json({
            "status" : "success",
            "message" : "entry successfully added"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
})

app.get('/get-expenses', async function(request, response) {
    try {
        const expenseDetails = await Expense.find()
        response.status(200).json(expenseDetails)
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch data",
            "error" : error
        })
    }
})
