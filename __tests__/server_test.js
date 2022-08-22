const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app); // integra jest com o app

it('Deve retornar status 200 ao chamar o raiz da aplicacao', () => {
    return request.get('/').then(res => {
        expect(res.statusCode).toEqual(200);
    }).catch(error =>{
        fail(error);
    });
});
