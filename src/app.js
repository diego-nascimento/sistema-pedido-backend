const express = require('express')
require('express-async-errors')
const routes = require('./routes')
const cors = require('cors')
const Sentry = require('@sentry/node')
const sentryConfig = require('./config/sentry')
const youch = require('youch')

require('./database')
require('dotenv').config()

class server{
    constructor(){
        this.server = express()
        Sentry.init(sentryConfig)
        this.server.use(Sentry.Handlers.requestHandler())

        this.midwares()
        this.routes()
        this.exceptionHandler()
    }

    midwares(){
        this.server.use(Sentry.Handlers.requestHandler())
        this.server.use(express.json())
        this.server.use('/file', express.static('uploads'))
        this.server.use(cors())
    }

    routes(){
        this.server.use(routes)
        this.server.use(Sentry.Handlers.errorHandler())
    }

    exceptionHandler(){
        this.server.use(async (error, req, res, next) =>{
            const errors = await new youch(error, req).toJSON()

            return res.status(500).json(errors)
        })
    }
}

module.exports = new server().server