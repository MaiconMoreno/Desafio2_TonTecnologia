const { createLogger, format, transports } = require('winston');

module.exports = createLogger({

    format: format.combine(

        format.timestamp({ format: 'DD/MM/YYYY HH:MM:ss' }),
        format.errors({ stack: true }),
        format.json(),
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}`)
    ),

    transports: [

        new transports.File({
            maxsize: 5000000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/log-api.log`
        }),

        new transports.Console({
            level: 'debug'
        })
    ]
});

