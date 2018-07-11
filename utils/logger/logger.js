const winston = require('winston')

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.json(),
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true
        }),
        new winston.transports.File({
            filename: 'logs/error/error.log',
            level: 'error',
            timestamp: true
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: 'logs/exception/exceptions.log',
            level: 'alert',
            timestamp: true
        })
    ],
    exitOnError: false
})

module.exports = logger