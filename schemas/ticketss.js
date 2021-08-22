const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
      ticketcreator: String,
      content: Array
})

module.exports = mongoose.model('tickets', Schema)