const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app); // integra jest com o app

describe("Teste de cadastro de usuario", () => {

    it("Deve cadastrar um usuario com sucesso", () => {
            let time = Date.now();
            let email = `${time}@gmail.com` 
            let user = {
                name: 'Artur',
                email,
                password: '123456' 
            }

            return request.post('/user')
                .send(user)
                .then(res => {
                    
                    expect(res.statusCode).toEqual(201);

                }).catch(error => {
                    //fail(error);
                    throw new Error(error);
                })
        });

});