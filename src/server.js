/*
 * server.js
 * This file is the core of your bot
 *
 * It creates a little server using express
 * So, your bot can be triggered throught "/" route
 *
 * This file was made for locally testing your bot
 * You can test it by running this command
 * curl -X "POST" "http://localhost:5000" -d '{"text": "YOUR_TEXT"}' -H "Content-Type: application/json; charset=utf-8"
 * You might modify the server port ^^^^  depending on your configuration in config.js file
 */

const express = require('express')
const bodyParser = require('body-parser')

// Load configuration
const config = require('./config')
const {getEmployees, getProducts, getSuppliers} = require('./functions')
const path = require('path')

// Start Express server
const app = express()
app.set('port', config.PORT)
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))

// Handle / route


app.post('/get-products', (request, response) => {
  console.log('Route /get-products')
  return response.json({
    replies: getProducts(),
  })
})


app.post('/get-employees', (request, response) => {
  console.log('Route /get-employees')
  return response.json({
    replies: getEmployees(),
  })
})


app.post('/get-suppliers', (request, response) => {
  console.log('Route /get-suppliers')
  return response.json({
    replies: getSuppliers(),
  })
})

if (!config.REQUEST_TOKEN) {
  console.log('ERROR: process.env.REQUEST_TOKEN variable in src/config.js file is empty ! You must fill this field with the request_token of your bot before launching your bot locally')

  process.exit(0)
} else {
  // Run Express server, on right port
  app.listen(app.get('port'), () => {
    console.log('Our bot is running on port', app.get('port'))
  })
}
