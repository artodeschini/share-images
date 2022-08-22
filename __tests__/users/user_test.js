const supertest = require('supertest');
const app = require('../../src/app');
const UserController = require('../../src/controller/UserController');
const request = supertest(app); // integra jest com o app

const mongoose = require('mongoose');
const model = require('../../src/model/User');
const User = mongoose.model('User', model);

const jwtUser = {
    name: "teste",
    email: "teste@teste.com",
    password: '123456'
}

const newUser = {
    name: "teste",
    email: "new@new.com",
    password: '123456'
}

// executa antes de todos os testes
beforeAll(() => {
    return request.post(`/user`)
        .send(jwtUser)
        .then(res => {})
        .catch(error => {console.log(error)});
});

// executa depois de todos os testes
afterAll(() => {
    return User.deleteMany({name: 'teste'}).then(res => {}).catch(e => console.log(e));
});

describe("Teste de cadastro de usuario", () => {
    it("Deve cadastrar um usuario com sucesso", () => { 
        return request.post('/user')
            .send(newUser)
            .then(res => {
                
                expect(res.statusCode).toEqual(201);

            }).catch(error => {
                console.log(error);
                throw new Error(error);
            });
    });

    it('Deve impedir que um usuario seja cadastrado com dados vazios', () => {
        let user = {
            name: '',
            email: '',
            password: '' 
        }

        return request.post('/user')
            .send(user)
            .then(res => {
                
                expect(res.statusCode).toEqual(400);
                expect(res.body.msg).toContain('sao obrigatorios');

            }).catch(error => {
                //fail(error);
                throw new Error(error);
            })
    });

    it("Nao deve permitir cadastrar um usuario com email já existente", () => {
        return request.post('/user')
            .send(jwtUser)
            .then(res => {
                
                expect(res.statusCode).toEqual(400);
                expect(res.body.msg).toContain('email ja em uso');

            }).catch(error => {
                //fail(error);
                throw new Error(error);
            })
    });

});