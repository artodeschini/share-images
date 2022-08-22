const mongoose = require('mongoose');
const model = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('./secret');

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

                let salt = await bcrypt.genSalt(key.salt);
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

        try {

            let user = await User.findOne({'email': email});

            if (user != undefined) {
                // bcrypt.compareSync(password, user.password);
                let result = await bcrypt.compareSync(password, user.password);

                if (result) {
                    // let token = jwt.sign({emai: user.email, role: user.role , secret);
                    jwt.sign(
                        {
                            id: user.id,
                            email: user.email,
                            nome: user.nome
                            /*, role: user.role */
                        },
                        key.secret,
                        {expiresIn: '1h'},
                        //{expiresIn: '1m'},
                        (e, token) => {
                            if (e) {
                                console.log(e);
                                return {status: false, codigo: 400, msg: 'Erro ao gerar token'};
                                // res.status(400);
                                // res.send({message:"Erro ao gerar o token"});
                            } else {
                                // res.status(200);
                                // res.send({'token': token});
                                return {status: true, codigo: 200, msg: '', token};
                            }
                        }
                    );

                } else {
                    //res.status(401);
                    //res.send({msg: 'login invalido'});
                    return {status: false, codigo: 401, msg: 'login invalido'};
                }

            } else {
                return {status: false, codigo:404, msg: 'usuario nao encontrado'};
            }
            
        } catch (e) {
            console.log(e);
            return {status: false, codigo:404, msg: e};
        }
    }
}

module.exports = new UserService();
