const mailer = require("nodemailer")

const emailConfig = require("../../config/email")
const logger = require("../logger/logger")
const fs = require("fs")
const handlebars = require("handlebars")
const path = require("path")
const templatePath = path.join(__dirname, '/template/Email.html')

module.exports = function sendEmail(data) {
    
    fs.readFile(templatePath, 'utf8', function (err, html) {

        if (err) {
            logger.error(err)
        } else {

            const config = mailer.createTransport({
                secure: emailConfig.secure,
                port: emailConfig.port,
                host: emailConfig.host,
                auth: {
                    user: emailConfig.username,
                    pass: emailConfig.password,
                }
            })

            var template  = handlebars.compile(html)

            var replacements = {
                token: data.token
            }

            var emailTemplate = template(replacements);

            const emailOptions = {
                from: emailConfig.username,
                to: data.email,
                subject: emailConfig.subject,
                html: emailTemplate
            }

            config.sendMail(emailOptions, (error, response) => {
                if (error) {
                    logger.error(error)
                } else {
                    logger.info(`Email is sent at  ${Date.now()}`)
                }
            })

        }
    })

}