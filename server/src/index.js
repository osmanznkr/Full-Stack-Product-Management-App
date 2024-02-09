const express = require('express')
const app = express()
app.use(express.json())
const {PORT} = require('./constants')

// import routes
const productRoutes = require('./routes/product')
const categoryRoutes = require('./routes/category')

// initialize routes
app.use('/api/v1', productRoutes)
app.use('/api/v1', categoryRoutes)


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