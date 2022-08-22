const mongoose = require('mongoose');
const model = require('../model/User');

const User = mongoose.model('User', model);

class UserService {

    async create(body) {

        if (body.name == '' || body.email == '' || body.password == '') {
            return false;
            
        } else {
            let {name, email, password} = body;
            let document = new User({name, email, password});

            try {
                await document.save();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }

        
    }
}

module.exports = new UserService();
