// Database imports
const pgPool = require("./db/pgWrapper");
const tokenDB = require("./db/tokenDB")(pgPool);
const userDB = require("./db/userDB")(pgPool);
// OAuth imports
const oAuthService = require("./auth/tokenService")(userDB, tokenDB);
const oAuth2Server = require("node-oauth2-server");

const products = require("./controllers/product.js")
const express = require('express')
const cors = require('cors')
const app = express()
app.oauth = oAuth2Server({
    model: oAuthService,
    grants: ["password"],
    debug: true,
});

// Auth and routes
const authenticator = require("./auth/authenticator")(userDB);
const routes = require("./auth/routes")(
    express.Router(),
    app,
    authenticator
);
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(app.oauth.errorHandler());

const {PORT} = require('./constants')

// import routes
const productRoutes = require('./routes/product.js')(
    express.Router(),
    app,
    products
);
const categoryRoutes = require('./routes/category.js')

// initialize routes
app.use('/api/v1', productRoutes)
app.use('/api/v1', categoryRoutes)

app.use("/api/v1/auth", routes);

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