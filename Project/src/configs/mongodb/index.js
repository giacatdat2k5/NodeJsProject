const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://doublek2k5:datnhan24@cluster0.3kvyds3.mongodb.net/project?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log('Database - Connect successfully !!!');
    } catch (error) {
        console.log('Database - Connect failure!!!');
    }
}

module.exports = {connect};