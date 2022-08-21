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