const queue = require('./lib/queue')
require('dotenv').config()


queue.processQueue()
console.log('fila executando')

