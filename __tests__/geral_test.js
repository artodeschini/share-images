const supertest = require('supertest');
const app = require('../src/app');
const request = supertest(app); // integra jest com o app
const requestGoogle = supertest('http://www.google.com');

test("Ao chamar a url do google deve retornar status 200", () => {
    // com promise colocar sempre return
    return requestGoogle.get('/').then(res => {
        expect(res.statusCode).toEqual(200);
    });
});

test("Ao chamar a url do google deve retornar status 200 com async ", async () => {
    // com promise colocar sempre return
    try {
        const res = await requestGoogle.get('/'); //.then(res => {
        expect(res.statusCode).toEqual(200);
    } catch (error) {
        throw new Error('I have failed you, Anakin');
    }
});

it('Deve retornar status 200 ao chamar o raiz da aplicacao', () => {
    return request.get('/').then(res => {
        expect(res.statusCode).toEqual(200);
    });
});

describe("Teste das cores", () => {
    it('Deve retornar azul ao chamar /cor/artur', () => {
        return request.get('/cor/artur').then(res => {
            expect(res.statusCode).toEqual(200);
            expect(res.body.cor).toEqual('azul');
        });
    });

    it('Deve retornar azul ao chamar /cor/manu', () => {
        return request.get('/cor/manu').then(res => {
            expect(res.statusCode).toEqual(200);
            expect(res.body.cor).toEqual('rosa');
        });
    });

    it('Deve retornar azul ao chamar /cor/catia', () => {
        return request.get('/cor/catia').then(res => {
            expect(res.statusCode).toEqual(200);
            expect(res.body.cor).toEqual('vermelho');
        });
    });

    it('Deve retornar azul ao chamar /cor/bla', () => {
        return request.get('/cor/bla').then(res => {
            expect(res.statusCode).toEqual(200);
            expect(res.body.cor).toContain('bla');
        });
    });
});
