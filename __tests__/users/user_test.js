const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app); // integra jest com o app

const testeUser = {
    name: "teste",
    email: "teste@teste.com",
    password: '123456'
}

const userCreate = {
    name: "new",
    email: "new@new.com",
    password: '123456'
}

// executa antes de todos os testes
beforeAll(() => {
    return request.post(`/user`)
        .send(testeUser)
        .then(res => {})
        .catch(error => {console.log(error)});
});

// executa depois de todos os testes
afterAll(() => {
    deleteUser(testeUser);
    deleteUser(userCreate);
});

function deleteUser(user) {
    return request.delete(`/user/${user.email}`)
        .then(res => {})
        .catch(error => {console.log(error)});
}

describe("Teste de cadastro de usuario", () => {
    it("Deve cadastrar um usuario com sucesso", () => { 
        return request.post('/user')
            .send(userCreate)
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
            .send(testeUser)
            .then(res => {
                
                expect(res.statusCode).toEqual(400);
                expect(res.body.msg).toContain('email ja em uso');

            }).catch(error => {
                //fail(error);
                throw new Error(error);
            })
    });

});