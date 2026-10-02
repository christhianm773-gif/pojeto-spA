// ==========================================
// LISTA DE USUÁRIOS
// ==========================================

const alunos = [];


// ==========================================
// CATÁLOGO DE LIVROS
// ==========================================

const livros = [
    {
        titulo: "The Imitation Game — Richmond Ed.",
        autor: "Richmond",
        categoria: "História e Tecnologia",
        descricao:
            "Obra relacionada à história de Alan Turing e à decifração de códigos durante a Segunda Guerra Mundial.",
        quantidade: 1,
        imagem:
            "https://tse4.mm.bing.net/th/id/OIP.7sN_hUUruuL_7sgxIcy5wgHaKf?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },

    {
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        categoria: "Romance",
        descricao:
            "Romance clássico da literatura brasileira narrado por Bentinho.",
        quantidade: 3,
        imagem:
            "https://covers.openlibrary.org/b/title/Dom%20Casmurro-M.jpg"
    },

    {
        titulo: "O Alienista",
        autor: "Machado de Assis",
        categoria: "Literatura Brasileira",
        descricao:
            "Narrativa que aborda, com humor e ironia, os limites entre razão e loucura.",
        quantidade: 2,
        imagem:
            "https://covers.openlibrary.org/b/title/O%20Alienista-M.jpg"
    },

    {
        titulo: "Memórias Póstumas de Brás Cubas",
        autor: "Machado de Assis",
        categoria: "Romance",
        descricao:
            "Romance narrado por Brás Cubas depois de sua morte.",
        quantidade: 2,
        imagem:
            "https://covers.openlibrary.org/b/title/Memorias%20Postumas%20de%20Bras%20Cubas-M.jpg"
    },

    {
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        categoria: "Literatura",
        descricao:
            "História sobre um pequeno príncipe que viaja por diferentes planetas.",
        quantidade: 2,
        imagem:
            "https://covers.openlibrary.org/b/title/O%20Pequeno%20Principe-M.jpg"
    },

    {
        titulo: "1984",
        autor: "George Orwell",
        categoria: "Ficção Distópica",
        descricao:
            "Romance distópico que apresenta uma sociedade marcada por vigilância constante.",
        quantidade: 1,
        imagem:
            "https://covers.openlibrary.org/b/title/1984-M.jpg"
    }
];


// ==========================================
// NAVEGAÇÃO
// ==========================================

function marcarMenuAtivo(pagina) {

    document
        .querySelectorAll("nav button")
        .forEach(function(botao) {
            botao.classList.remove("ativo");
        });

    const nomes = {
        inicio: "menuInicio",
        cadastro: "menuCadastro",
        lista: "menuLista",
        livros: "menuLivros",
        sobre: "menuSobre"
    };

    if (nomes[pagina]) {
        document
            .getElementById(nomes[pagina])
            .classList.add("ativo");
    }
}


function irPara(pagina) {

    document
        .querySelectorAll(".tela")
        .forEach(function(tela) {
            tela.classList.remove("ativa");
        });

    const tela = document.getElementById(pagina);

    if (tela) {
        tela.classList.add("ativa");
    }

    marcarMenuAtivo(pagina);

    if (pagina === "lista") {
        renderizarTabela();
    }
}


// ==========================================
// CADASTRO DE USUÁRIO
// ==========================================

document
    .getElementById("formAluno")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const cpf =
            document.getElementById("cpf").value.trim();

        const nome =
            document.getElementById("nome").value.trim();

        const telefone =
            document.getElementById("telefone").value.trim();

        if (!cpf || !nome || !telefone) {
            alert("Preencha todos os campos!");
            return;
        }

        const cpfExiste = alunos.some(function(aluno) {
            return aluno.cpf === cpf;
        });

        if (cpfExiste) {
            alert("Este CPF já está cadastrado!");
            return;
        }

        alunos.push({
            cpf: cpf,
            nome: nome,
            telefone: telefone
        });

        const mensagem =
            document.getElementById("mensagem");

        mensagem.textContent =
            "Usuário cadastrado com sucesso!";

        mensagem.style.display = "block";

        document.getElementById("formAluno").reset();

        renderizarTabela();

        setTimeout(function() {
            mensagem.style.display = "none";
        }, 3000);
    });


// ==========================================
// LISTA DE USUÁRIOS
// ==========================================

function renderizarTabela() {

    const tabela =
        document.getElementById("tabelalivros");

    if (alunos.length === 0) {

        tabela.innerHTML = `
            <p>Nenhum usuário cadastrado.</p>

            <button onclick="irPara('cadastro')">
                Cadastrar usuário
            </button>
        `;

        return;
    }

    let html = `
        <table>
            <thead>
                <tr>
                    <th>CPF</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                </tr>
            </thead>

            <tbody>
    `;

    alunos.forEach(function(aluno) {

        html += `
            <tr>
                <td>${aluno.cpf}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.telefone}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    tabela.innerHTML = html;
}


// ==========================================
// ACESSAR CATÁLOGO
// ==========================================

function acessarLivros() {

    if (alunos.length === 0) {

        alert(
            "É necessário cadastrar um usuário antes de acessar o catálogo."
        );

        irPara("cadastro");

        return;
    }

    mostrarLivros();
}


// ==========================================
// MOSTRAR CATÁLOGO
// ==========================================

function mostrarLivros() {

    document
        .querySelectorAll(".tela")
        .forEach(function(tela) {
            tela.classList.remove("ativa");
        });

    document
        .getElementById("livros")
        .classList.add("ativa");

    marcarMenuAtivo("livros");

    renderizarLivros();
}


// ==========================================
// RENDERIZAR LIVROS
// ==========================================

function renderizarLivros() {

    const lista =
        document.getElementById("listaLivros");

    lista.innerHTML = "";

    livros.forEach(function(livro, index) {

        const disponivel = livro.quantidade > 0;

        const status =
            disponivel
                ? "🟢 Disponível"
                : "🔴 Indisponível";

        const classeStatus =
            disponivel
                ? "disponivel"
                : "indisponivel";

        lista.innerHTML += `
            <div class="livro">

                <img
                    class="capa-livro"
                    src="${livro.imagem}"
                    alt="Capa de ${livro.titulo}"
                    onerror="this.src='https://via.placeholder.com/300x400?text=Sem+Foto'"
                >

                <div class="livro-conteudo">

                    <h3>
                        ${index + 1}. ${livro.titulo}
                    </h3>

                    <p>
                        <strong>Autor:</strong>
                        ${livro.autor}
                    </p>

                    <p>
                        <strong>Categoria:</strong>
                        ${livro.categoria}
                    </p>

                    <p>
                        <strong>Quantidade:</strong>
                        ${livro.quantidade}
                    </p>

                    <p>
                        <span class="status ${classeStatus}">
                            ${status}
                        </span>
                    </p>

                    <p>
                        <strong>Descrição:</strong><br>
                        ${livro.descricao}
                    </p>

                </div>
            </div>
        `;
    });
}


// ==========================================
// FORMULÁRIO DE LIVRO
// ==========================================

function mostrarFormularioLivro() {

    document
        .getElementById("formularioLivro")
        .style.display = "block";

    document
        .getElementById("formularioLivro")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function esconderFormularioLivro() {

    document
        .getElementById("formularioLivro")
        .style.display = "none";

    document
        .getElementById("formLivro")
        .reset();

    document
        .getElementById("previewFoto")
        .style.display = "none";
}


// ==========================================
// PRÉVIA DA FOTO
// ==========================================

document
    .getElementById("fotoLivro")
    .addEventListener("change", function(event) {

        const arquivo = event.target.files[0];

        if (!arquivo) {
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function(e) {

            const preview =
                document.getElementById("previewFoto");

            preview.src = e.target.result;

            preview.style.display = "block";
        };

        leitor.readAsDataURL(arquivo);
    });


// ==========================================
// ADICIONAR LIVRO
// ==========================================

document
    .getElementById("formLivro")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo =
            document.getElementById("tituloLivro")
            .value.trim();

        const autor =
            document.getElementById("autorLivro")
            .value.trim();

        const categoria =
            document.getElementById("categoriaLivro")
            .value.trim();

        const descricao =
            document.getElementById("descricaoLivro")
            .value.trim();

        const quantidade =
            Number(
                document.getElementById("quantidadeLivro")
                .value
            );

        const arquivo =
            document.getElementById("fotoLivro")
            .files[0];

        if (!titulo || !autor || !categoria || !descricao) {
            alert("Preencha todos os campos do livro!");
            return;
        }

        if (arquivo) {

            const leitor = new FileReader();

            leitor.onload = function(e) {

                adicionarLivroNaLista(
                    titulo,
                    autor,
                    categoria,
                    descricao,
                    quantidade,
                    e.target.result
                );
            };

            leitor.readAsDataURL(arquivo);

        } else {

            adicionarLivroNaLista(
                titulo,
                autor,
                categoria,
                descricao,
                quantidade,
                "https://via.placeholder.com/300x400?text=Sem+Foto"
            );
        }
    });


// ==========================================
// ADICIONAR LIVRO NA LISTA
// ==========================================

function adicionarLivroNaLista(
    titulo,
    autor,
    categoria,
    descricao,
    quantidade,
    imagem
) {

    livros.push({
        titulo: titulo,
        autor: autor,
        categoria: categoria,
        descricao: descricao,
        quantidade: quantidade,
        imagem: imagem
    });

    alert("📚 Livro adicionado com sucesso!");

    document
        .getElementById("formLivro")
        .reset();

    document
        .getElementById("previewFoto")
        .style.display = "none";

    document
        .getElementById("formularioLivro")
        .style.display = "none";

    renderizarLivros();
}


// ==========================================
// MÁSCARA CPF
// ==========================================

document
    .getElementById("cpf")
    .addEventListener("input", function() {

        let valor =
            this.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

        valor = valor.replace(
            /(\d{3})(\d)/,
            "$1.$2"
        );

        valor = valor.replace(
            /(\d{3})(\d)/,
            "$1.$2"
        );

        valor = valor.replace(
            /(\d{3})(\d{1,2})$/,
            "$1-$2"
        );

        this.value = valor;
    });


// ==========================================
// MÁSCARA TELEFONE
// ==========================================

document
    .getElementById("telefone")
    .addEventListener("input", function() {

        let valor =
            this.value.replace(/\D/g, "");

        valor = valor.substring(0, 11);

        if (valor.length <= 10) {

            valor = valor.replace(
                /(\d{2})(\d)/,
                "($1) $2"
            );

            valor = valor.replace(
                /(\d{4})(\d)/,
                "$1-$2"
            );

        } else {

            valor = valor.replace(
                /(\d{2})(\d)/,
                "($1) $2"
            );

            valor = valor.replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );
        }

        this.value = valor;
    });


// ==========================================
// INÍCIO
// ==========================================

marcarMenuAtivo("inicio");