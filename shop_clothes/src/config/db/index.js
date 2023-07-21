const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/db_shopmeme', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to success');
    } catch (error) {
        console.log('Connected to failure');
    }
}
module.exports = { connect };