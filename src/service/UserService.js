const mongoose = require('mongoose');
const model = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('./secret');

const User = mongoose.model('User', model);

class UserService {

    async create(body) {

        if (body.name == '' || body.email == '' || body.password == '') {
            return {status: false, msg: 'campos name email e password sao obrigatorios'};

        } else {
            let {name, email, password} = body;
            

            try {
                let checkEmail = await User.find({'email': email});
                
                if (checkEmail != undefined && checkEmail.length > 0) {
                    return {status: false, msg: 'email ja em uso'};
                }

                let salt = await bcrypt.genSalt(secret.salt);
                let hash = await bcrypt.hash(password, salt);
                
                let document = new User({name, email, password: hash});
                await document.save();
                return {status: true, msg: 'usuario cadastrado'};

            } catch (error) {
                console.log(error);
                return {status: false, msg: error};
            }
        }
    }

    async delete(email) {
        try {
            await User.deleteOne({'email': email});
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async login(body) {
        let {email, password} = body;

        jwt.sign({email}, secret.secret, {expiresIn: '1h'});
    }
}

module.exports = new UserService();
