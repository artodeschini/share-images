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
                console.log(error);
                throw new Error(error);
            })
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

                return request.post('/user')
                .send(user)
                .then(res => {
                    
                    expect(res.statusCode).toEqual(400);
                    expect(res.body.msg).toContain('email ja em uso');
    
                }).catch(error => {
                    //fail(error);
                    throw new Error(error);
                })

            }).catch(error => {
                //fail(error);
                throw new Error(error);
            })
    });

});