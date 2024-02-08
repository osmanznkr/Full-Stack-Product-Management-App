const express = require('express')
const app = express()
app.use(express.json())
const {PORT} = require('./constants')

// import routes
const productRoutes = require('./routes/product')

// initialize routes
app.use('/api/v1', productRoutes)

const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`App is running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

appStart()