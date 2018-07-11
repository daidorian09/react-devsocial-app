const MS_PER_DAY = 1000 * 60 * 60 * 24

module.exports = function subtractDates(expirationDate) {

    var expirationDateInUTCFormat = Date.UTC(expirationDate.getFullYear(), expirationDate.getMonth(), expirationDate.getDate())
    var currentDate = new Date()

    var currentDateInUTCFormat = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    
    return Math.floor(currentDateInUTCFormat - expirationDateInUTCFormat) / MS_PER_DAY < 0
}
