const express = require("express");
const connectDB = require("./config/database.js")

const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(PORT, () => {
  connectDB
  console.log(`Server is currently running on port ${PORT}`)
});