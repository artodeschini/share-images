const calculadora = require('../src/calculadora');

describe("Operacoes basicas", () => {

    // primeiro teste it e test sao iguais pode se usar qualquer uma das duas
    test("Deve retornar 10 quando somar 5 + 5", () => {
        const resultado = calculadora.soma(5, 5);

        expect(resultado).toEqual(10);
    });

    // it("Deve retornar um ao somar 5 + 5 esperando 11", () => {
    //     const resultado = app.soma(5,5);

    //     expect(resultado).toBeGreaterThan(9);
    //     //expect(resultado).toEqual(10); isso daria um erro
    // });

    test("Deve retornar 10 quando enviar 2 * 5 ", () => {
        const resultado = calculadora.multiplicacao(2,5);

        expect(resultado).toEqual(10);
    });

    test("Deve retornar 2 quando subtrair 5 - 3 ", () => {
        const resultado = calculadora.subtracao(5,3);

        expect(resultado).toEqual(2);
    });

    test("Deve retornar 2 quando dividir 10 / 5 ", () => {
        const resultado = calculadora.divisao(10,5);

        expect(resultado).toEqual(2);
    });

    test("Deve lancar erro quando dividir algo por 0", () => {
        //try {
            const resultado = calculadora.divisao(1/0);
            console.log(resultado);
            expect(resultado).toBeNaN();
                      //throw new Error('xi deu ruim deixou dividir por 0');
        //} catch (error) {
            //console.log(error);
            //expect(error).toContain('0');
        //}
    });

});
