const canvas = document.getElementById("cobra");

/* A interface Canvas Renderização de Contexto de duas Dimensões ( CanvasRenderingContext2D) 
é usada para desenhar retangulos, textos, imagens e outros objetos na tag ou elemento 
canvas. Fornece o contexto de renderização em 2D para a superfície de desenho do 
elemento  <canvas>. Para obter um objeto desta interface, chama-se  getContext() 
em um elemento <canvas>, adicionando "2d" como argumento
 */
const context = canvas.getContext("2d");

// tamanho do quadradinho = 32 pixels
const box = 32;

// variaveis base para a cobrinha que será um array
const cobrinha = [];
cobrinha[0] = {
  x: 8 * box,
  y: 8 * box
}
let direcao = "direita";

// função para cliar o "campo do jogo"
function criaFundo(){
  //preenche o fundo
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// função para criar a cobrinha
function criaCobrinha(){
  for(i=0; i< cobrinha.length; i++){
    context.fillStyle = "green";
    context.fillRect(cobrinha[i].x, cobrinha[i].y, box, box);
  }
}

function iniciarJogo(){
  criaFundo();
  criaCobrinha();

  let cobrinhaX = cobrinha[0].x;
  let cobrinhaY = cobrinha[0].y;

  // movimenta para a direção determinada
  if(direcao == "direita") cobrinhaX += box;
  if(direcao == "esquerda") cobrinhaX -= box;
  if(direcao == "cima") cobrinhaY -= box;
  if(direcao == "baixo") cobrinhaY += box;

  // retira o ultimo elemento do array (rabinho da cobra)
  cobrinha.pop();

  // cria uma nova cabeça para a cobra
  let novaCabeca = {
    x: cobrinhaX,
    y: cobrinhaY
  }

  // acrescenta um elemento na frente do array
  cobrinha.unshift(novaCabeca);
}

let jogo = setInterval(iniciarJogo, 100);
