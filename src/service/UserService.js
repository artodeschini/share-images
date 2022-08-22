const mongoose = require('mongoose');
const model = require('../model/User');

const User = mongoose.model('User', model);

class UserService {

    async create(body) {

        let {name, email, password} = body;
        let document = new User({name, email, password});

        try {
            await document.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = new UserService();
