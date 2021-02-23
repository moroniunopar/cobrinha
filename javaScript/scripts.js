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
const fimTela = 512;
let direcao = "esquerda";
let totalPontos = 60;
let descontaTempo = 0;
let descontaPonto = 0;

// dificuldade = aumenta a área de erro ao redor da comida,
// ou seja, quanto maior este número mais preciso ao pegar 
// a comita o jogador tem que ser.
// Também aumenta o desconto de pontos quando a cobra se acerta
let dificuldade = 2;

let inicio = true;
let comida = {cor: "", pontos: 0, x: 0, y: 0, }

const baseComida =[ {cor:"yellow", ponto:100}, 
                    {cor:"orange", ponto:250},
                    {cor:"red", ponto:300},
                    {cor:"teal", ponto:500}
                  ]; 

function novaComida() {
  let Cx = Math.floor(Math.random() * 4);
  comida = {
            cor: baseComida[Cx].cor,
            pontos: baseComida[Cx].ponto,
            x: Math.floor(Math.random() * 15 +1 ) * box,
            y: Math.floor(Math.random() * 15 +1 ) * box,
           }
}

// variaveis base para a cobrinha que será um array
let cobrinha = [];
cobrinha[0] = {
  x: 8 * box,
  y: 8 * box
}

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

// função para criar a comida
function criaComida(){
  context.fillStyle = comida.cor;
  context.fillRect(comida.x, comida.y, box, box);
  context.fillStyle = "black";
  context.fillText(comida.pontos, (comida.x + 8), (comida.y + 20));
}

document.addEventListener('keydown', mover);

function mover(event){
  if (event.keyCode == 39 && direcao != "esquerda") direcao = "direita";
  if (event.keyCode == 40 && direcao != "cima") direcao = "baixo";
  if (event.keyCode == 37 && direcao != "direita") direcao = "esquerda";
  if (event.keyCode == 38 && direcao != "baixo") direcao = "cima";
}
function pontuar(){
  document.getElementById("valTotal").innerHTML = totalPontos;
}

function iniciarJogo(){
  if (inicio) novaComida(); 
  inicio = false;
  criaFundo();
  criaCobrinha();
  criaComida();
  pontuar();

  descontaTempo ++ ;
  totalPontos = totalPontos - (1*(descontaTempo >= 10));
  descontaTempo = descontaTempo * (descontaTempo < 10);

  if (totalPontos <= 0) {
    alert("Sinto muito.... Fim de Jogo!!!  :( ")
    clearInterval(iniciarJogo);
  }


  let cobrinhaX = cobrinha[0].x;
  let cobrinhaY = cobrinha[0].y;
  // ----------------------------------------------------------------------------- //
  // aproveeitando a tipagem dinâmica do javaScript para  "economizar" IFs ;) ---- //
  //                                                                               //
  cobrinhaX = cobrinhaX + (box * (direcao == "direita"))                           //
                        - (box * (direcao == "esquerda"));                         //
  cobrinhaX = (cobrinhaX * (cobrinhaX < fimTela) + (fimTela * (cobrinhaX < 0 )));  //
                                                                                   //
  cobrinhaY = cobrinhaY + (box * (direcao == "baixo"))                             //
                        - (box * (direcao == "cima"));                             //  
  cobrinhaY = (cobrinhaY * (cobrinhaY < fimTela) + (fimTela * (cobrinhaY < 0 )));  //
  // ----------------------------------------------------------------------------- //
  

  // - Verifica "comilança" ------------------------------------------------------
  if (cobrinhaX == comida.x && cobrinhaY == comida.y) {
    // caso pegue a comida,
    // a cobra aumenta (não retira o ultimo elemento da array cobrinha),
    // gera uma nova comida e soma pontos
    totalPontos = totalPontos + comida.pontos + (dificuldade-1);
    novaComida();
  } else {
    // caso não pegue a comida,
    // retira o ultimo elemento do array (rabinho da cobra)
    cobrinha.pop();
    // e se não pegar mas passar perto, a comida vale menos.

    descontaPonto = (1 * 
         (cobrinhaX > (comida.x - (dificuldade * box))) 
      && (cobrinhaX < (comida.x + (dificuldade * box)))
      && (cobrinhaY > (comida.y - (dificuldade * box))) 
      && (cobrinhaY < (comida.y + (dificuldade * box)))
      )
      comida.pontos = comida.pontos - descontaPonto;
      totalPontos = totalPontos - descontaPonto;

  }
  // ----------------------------------------------------------------------------

  // - Caso a cobrinha se acerte
  for (i=1; i < cobrinha.length; i++){
    if (cobrinha[0].x == cobrinha[i].x && cobrinha[0].y == cobrinha[i].y){
      cobrinha.pop();
      totalPontos = totalPontos - (cobrinha.length*dificuldade*10);
    } 
  }
  
  // cria uma nova cabeça para a cobra
  let novaCabeca = {
    x: cobrinhaX,
    y: cobrinhaY
  }

  // acrescenta um elemento na frente do array
  cobrinha.unshift(novaCabeca);

  // fim de jogo -> quando a pontuação chegar a zero
}

let jogo = setInterval(iniciarJogo, 100);



