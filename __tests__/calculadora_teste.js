const app = require('../app');

// primeiro teste it e test sao iguais pode se usar qualquer uma das duas
test("Deve retornar 10 quando somar 5 + 5", () => {
    const resultado = app.soma(5, 5);

    expect(resultado).toEqual(10);
});

it("Deve retornar um ao somar 5 + 5 esperando 11", () => {
    const resultado = app.soma(5,5);

    expect(resultado).toBeGreaterThan(10);
    //expect(resultado).toEqual(10); isso daria um erro
});