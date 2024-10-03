// MÃO NA MASSA: como suprimir objetos vazios de um array de objetos. Para isso, vamos usar o método de array reduce.
// O funcionamento básico do reduce é percorrer todos os índices de um array e “reduzir” seus valores a um único valor de retorno. Por exemplo:
const numeros = [1, 2, 3, 4, 5];
const result = numeros.reduce((acum, atual) => acum + atual, 0);

console.log(result); //15

// No exemplo acima, usamos reduce para reduzir um array de números até a soma de todos eles, começando a contagem em 0 e somando os parâmetros da função callback a cada iteração (valor acumulado + valor atual).

// Porém, o reduce também tem muitos usos mais complexos para arrays de objetos e pode nos ajudar a resolver o problema dos objetos vazios. Observe abaixo uma versão mais curta da solução feita com filter e map:
const paragrafos = ["código", "js", "", "web", "", "array"];

const result1 = paragrafos
 .filter((paragrafo) => paragrafo)
 .map((paragrafo) => {
   if (paragrafo) return paragrafo;
});

console.log(result1); // 15
// [ 'código', 'js', 'web', 'array' ]

// Agora, vamos analisar uma abordagem utilizando reduce:
const result2 = paragrafos.reduce((acum, paragrafo) => {
    if (paragrafo) {
      return [...acum, paragrafo];
    }
    return acum;
}, []);
   
console.log(result2); // 15
// [ 'código', 'js', 'web', 'array' ]
// [ 'código', 'js', 'web', 'array' ]


// Acompanhe os passos de desenvolvimento do código acima:

// 1. Queremos “reduzir” o array atual a um outro array, então iniciamos reduce com um valor atual de [] (um array vazio).
// 2. Os parâmetros da função callback são acum (em que são armazenados os valores já processados) e paragrafo, que se refere ao parágrafo sendo processado a cada iteração.
// 3. A condicional if (paragrafo) avalia a string paragrafo em termos booleanos (lembrando de valores truthy e falsy) e apenas entra no if caso paragrafo não seja uma string vazia.
// 4. Caso não seja uma string vazia, o código dentro do bloco if utiliza o spread operator (operador de espalhamento) para retornar um array composto dos valores anteriores (acum) “espalhados” em um novo array com o conteúdo do parágrafo atual.
// 5. Caso seja uma string vazia, o código do bloco if não será executado, e o loop do reduce irá passar direto para o próximo elemento do array, ignorando a string vazia e a deixando de fora do array final.
// 6. Após percorrer todos os elementos, o resultado final de acum será um array composto apenas de strings “não vazias” (avaliadas como truthy na condicional if).


// *Qual método utilizar? Apesar de o método reduce construir um novo array a cada iteração, a não ser que se trate de textos e arrays muito grandes, não deve haver muita diferença de performance entre os métodos. É comum existir mais de uma forma de resolver problemas de lógica de programação!
