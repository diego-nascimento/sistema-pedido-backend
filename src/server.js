const server = require('./app')
require('dotenv').config()
server.listen(process.env.APP_PORT,  ()=>{
    console.log('server running on port ' + process.env.APP_PORT)
})