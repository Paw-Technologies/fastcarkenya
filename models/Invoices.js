const mongoose = require('mongoose')

const newInvoice = new mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    invoiceId: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false
    }
})

module.exports = new mongoose.model('Invoices', newInvoice)
