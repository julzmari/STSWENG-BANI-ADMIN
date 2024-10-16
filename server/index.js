const { app, PORT } = require('./src/server')
const { connectDB } = require('./src/config/database')

connectDB()

app.listen(PORT, () => {
    
    console.log(`Server is currently running on port ${PORT}`)
});