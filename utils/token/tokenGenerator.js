const TokenGenerator = require('uuid-token-generator');

module.exports = function generateToken() {
    const tokenGenerator = new TokenGenerator(512, TokenGenerator.BASE71)
    return tokenGenerator.generate()
}