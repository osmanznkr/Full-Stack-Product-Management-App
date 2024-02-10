const express = require('express')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors());
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