const keys = require("../../config/keys")
module.exports = function setTokenExpiration (){
 const now = new Date();

 return now.setHours(now.getHours() + keys.confirmationTokenExpiration)

}