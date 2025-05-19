// Lista que armazenará os contatos temporariamente na memória enquanto o sistema está rodando
let listaContatos = [];

// Função que valida se um número de telefone tem a quantidade correta de dígitos 
function validarTelefone(telefone) {

    // Verifica se o telefone tem 10 ou 11 dígitos, aceitando números fixos e celulares
    if (telefone.length === 10 || telefone.length === 11) {
        return true; // Retorna verdadeiro se o número for válido
    } else {
        return false; // Retorna falso se o número não tiver a quantidade correta de dígitos
    }
}

// Função que adiciona um novo contato à lista e exibe na tela
function adicionarContato() {

    // Captura os campos de entrada do formulário
    const inputNome = document.getElementById('input_nome');
    const inputTelefoneP = document.getElementById('input_telefone_principal');
    const inputTelefoneS = document.getElementById('input_telefone_secundario');

    // Verifica se os campos foram preenchidos corretamente. 
    // Se estiverem vazios, interrompe o processo (return) e exibe um alerta (alert)
    if (!inputNome.value.trim()) {
        alert("Por favor, insira um nome."); // Exibe uma mensagem na tela informando o erro
        return; // Retorna antes de continuar, interrompendo a execução da função
    }
    if (!inputTelefoneP.value.trim()) {
        alert("Por favor, insira o telefone principal.");
        return;
    }
    if (!inputTelefoneS.value.trim()) {
        alert("Por favor, insira o telefone secundário.");
        return;
    }

    // Valida se os números de telefone possuem a quantidade correta de dígitos antes de salvar
    if (!validarTelefone(inputTelefoneP.value)) {
        alert("O telefone principal deve ter 10 ou 11 dígitos.");
        return;
    }
    if (!validarTelefone(inputTelefoneS.value)) {
        alert("O telefone secundário deve ter 10 ou 11 dígitos.");
        return;
    }

    // Percorre cada contato já cadastrado na lista de contatos
    for (const contato of listaContatos) {

        // Compara o telefone principal do contato atual com o telefone principal digitado pelo usuário.
        // Se forem iguais, significa que esse número já está cadastrado.
        if (contato.telefonePrincipal === inputTelefoneP.value) {
            alert("O telefone principal já está cadastrado."); // Exibe um alerta informando a duplicação
            return; // Interrompe a execução para evitar que o contato seja salvo novamente
        }
    }

    // Cria um objeto representando o contato com os valores inseridos
    const novoContato = {
        nome: inputNome.value,
        telefonePrincipal: inputTelefoneP.value,
        telefoneSecundario: inputTelefoneS.value
    };

    // Adiciona o contato na lista e salva no localStorage
    listaContatos.push(novoContato);
    salvarContato();

    // Exibe o contato na tabela da interface
    adicionarContatoNaTela(novoContato.nome, novoContato.telefonePrincipal, novoContato.telefoneSecundario);
}

// Função que salva a lista de contatos no localStorage
function salvarContato() {

    // Converte a lista de contatos para formato JSON e salva no localStorage
    localStorage.setItem('listaDeContatos', JSON.stringify(listaContatos));
}

// Função que carrega os contatos armazenados no localStorage e os exibe na tela //
function carregarContatos() {

    // Recupera a lista do localStorage, se existir
    const armazenamento = localStorage.getItem('listaDeContatos');

    // Condição para 'listaContatos' : Se 'armazenamento' conter dados,
    // 'listaContatos' será igual ao JSON.parse(armazenamento), convertendo os dados para um array de objetos,
    // caso contrário, 'listaContatos' será igual a um array vazio ([])
    listaContatos = armazenamento ? JSON.parse(armazenamento) : [];

    // Percorre a lista de contatos e os exibe na tabela
    for (const contato of listaContatos) {
        adicionarContatoNaTela(contato.nome, contato.telefonePrincipal, contato.telefoneSecundario);
    }
}

// Função que adiciona um contato na tabela da interface 
function adicionarContatoNaTela(nome, telefone1, telefone2) {

    // Cria uma nova linha na tabela para exibir o contato
    const novaLinha = document.createElement("tr");

    // Cria colunas para o nome e telefones
    const colunaNome = document.createElement("td");
    const colunaTelefonePrincipal = document.createElement("td");
    const colunaTelefoneSecundario = document.createElement("td");

    // Define o texto de cada coluna com os dados do contato
    colunaNome.innerText = nome;
    colunaTelefonePrincipal.innerText = telefone1;
    colunaTelefoneSecundario.innerText = telefone2;

    // Adiciona as colunas dentro da nova linha
    novaLinha.appendChild(colunaNome);
    novaLinha.appendChild(colunaTelefonePrincipal);
    novaLinha.appendChild(colunaTelefoneSecundario);

    // Insere a nova linha na tabela
    const tabelaContatos = document.getElementById("tabela_contatos");
    tabelaContatos.appendChild(novaLinha);
}

// Função que configura os eventos ao carregar a página 
function configurarEventos() {
    console.log("Página carregada");

    // Chama a função para carregar os contatos salvos e exibi-los na tela
    carregarContatos();

    // Vincula o botão "Adicionar Contato" à função de adicionar contato.
    const botaoAdicionar = document.getElementById('botao_adicionar');
    botaoAdicionar.addEventListener('click', adicionarContato);
}

// Executa 'configurarEventos' quando a página for totalmente carregada.
window.addEventListener('load', configurarEventos);
