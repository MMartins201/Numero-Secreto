let listaDeNumerosSorteados = [];
let numeroLimite =  100;
let numeroSecreto = gerarNumeroAleatiorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rete: 1.2} );
}

function exibirTextoInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto' );
    exibirTextoNaTela('p', 'Escolha um Número entre 1 e 100' );
}

exibirTextoInicial()

function verificarChute() {
    let chute = document.querySelector('input').value;
    limparCampo()
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou');
        let palavrasTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você Descobriu o Numero Secreto com ${tentativas} ${palavrasTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O Numero Secreto e Menor');
        } else {
            exibirTextoNaTela('p', 'O Numero Secreto é Maior');
        }
        tentativas++  
    }

}

function gerarNumeroAleatiorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1) ;
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatiorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatiorio();
    limparCampo();
    tentativas = 1;
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}