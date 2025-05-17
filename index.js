let listaContatos = [];

function adicionarContato() {
    const inputNome = document.getElementById('input_nome');
    const inputTelefoneP = document.getElementById('input_telefone_principal');
    const inputTelefoneS = document.getElementById('input_telefone_secundario');

    const novoContato = {
        nome: inputNome.value,
        telefonePrincipal: inputTelefoneP.value,
        telefoneSecundario: inputTelefoneS.value
    }

    listaContatos.push(novoContato);
    salvarContato();
}

function salvarContato() {
    const storage = localStorage.setItem('listaDeContatos', JSON.stringify(listaContatos));
    listaContatos = storage ? storage : [];
    for(contato of listaContatos){
        contato.nome;
        contato.telefonePrincipal;
        contato.telefoneSecundario;
    }
}

function carregarContatos() {
    const armazenamento = JSON.parse(localStorage.getItem('listaDeContatos'));
}

function adicionarContatoNaTela() {

}

function configurarEventos() {
    console.log("pagina carregada")
    const botaoAdicionar = document.getElementById('botao_adicionar');
    botaoAdicionar.addEventListener('click', adicionarContato);
}

window.addEventListener('load', configurarEventos);