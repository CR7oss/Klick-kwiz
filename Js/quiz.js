/* =====================================================
   KLICK KWIZ
   SISTEMA DE QUIZ DE PRIMEIRO ACESSO
   ===================================================== */

const perguntas = [

{
    textoApoio: `
    <strong>Texto de apoio:</strong><br><br>

    "Os homens de 1900 acreditavam no progresso porque, no século precedente,
    invenções extraordinárias mudaram o curso de suas vidas: a estrada de ferro,
    o telégrafo, os aviões que começaram a aparecer.

    Os homens e as mulheres do século passado estavam certos de que esses
    autênticos progressos seriam acompanhados, necessariamente, de progressos
    sociais e políticos.

    A eclosão da guerra mundial, em 1914-1918, pôs fim a essas ilusões,
    mas todos queriam acreditar que ela seria a última."

    <br><br>
    <em>Marc Ferro</em>
    `,

    titulo: "O texto de Marc Ferro destaca que o otimismo no 'século do progresso' foi abalado pelas guerras mundiais porque:",

    alternativas: [
        "Indicaram que as guerras resultaram apenas de tensões políticas comuns à Europa.",
        "Revelaram que a tecnologia poderia intensificar desigualdades econômicas entre continentes.",
        "Mostraram que inovações tecnológicas também podiam gerar destruição em larga escala.",
        "Demonstraram que os avanços científicos não tinham aplicação prática no cotidiano civil.",
        "Impediram definitivamente a continuidade de descobertas médicas e industriais."
    ],

    correta: 2,

    explicacao: "As guerras mundiais mostraram que a tecnologia também podia ser usada para destruição em massa."
},

{
    textoApoio: `
    <strong>Texto de apoio:</strong><br><br>

    O unboxing é o termo adotado para o ato de tirar produtos da caixa.

    Mais que o gesto em si, a fama se espalhou porque as pessoas começaram
    a filmar este processo e compartilhar nas suas redes sociais.

    O charme do unboxing está na surpresa, na alegria ou reação inusitada
    de ver o produto pela primeira vez.

    Para lojas e marcas, o unboxing gera valor de marca e incentiva o
    compartilhamento espontâneo.
    `,

    titulo: "De acordo com o texto, o unboxing utiliza-se de estratégia persuasiva ao:",

    alternativas: [
        "Demonstrar o funcionamento do objeto anunciado.",
        "Gerar uma imagem positiva para os influenciadores.",
        "Criar uma experiência negativa para a marca.",
        "Despertar a curiosidade sobre um produto.",
        "Estimular o público a evitar compras pela internet."
    ],

    correta: 3,

    explicacao: "O unboxing desperta curiosidade e expectativa sobre o produto."
},

{
    textoApoio: `
    <strong>Texto de apoio:</strong><br><br>

    Muitos metais melões pepinos romãs e figos
    De muitas castas

    Cidras limões e laranjas
    Uma infinidade

    Muitas canas de açúcar

    Infinito algodões

    Também há muito pão brasil
    Nestas capitanias

    <br><br>
    <em>Oswald de Andrade - Riquezas Naturais</em>
    `,

    titulo: "No poema 'Riquezas Naturais', Oswald de Andrade apresenta elementos da natureza para:",

    alternativas: [
        "Elogiar a agricultura tradicional nas capitanias.",
        "Valorizar a diversidade natural do Brasil.",
        "Lamentar a destruição dos recursos da natureza.",
        "Descrever a exploração das riquezas do país.",
        "Comparar a produção brasileira com a europeia."
    ],

    correta: 1,

    explicacao: "O poema valoriza a riqueza e diversidade natural do Brasil."
},

{
    textoApoio: `
    <strong>Texto de apoio:</strong><br><br>

    "Se vale mais ser amado que temido ou temido que amado.
    Responde-se que ambas as coisas seriam de desejar;
    mas porque é difícil juntá-las,
    é muito mais seguro ser temido que amado."

    <br><br>
    <em>Nicolau Maquiavel - O Príncipe</em>
    `,

    titulo: "A manutenção do poder político para Maquiavel baseia-se na:",

    alternativas: [
        "Bondade absoluta do governante com os cidadãos.",
        "Capacidade de usar o medo como ferramenta estratégica para manter a ordem.",
        "Obediência cega a todas as leis da Igreja Católica.",
        "Busca constante pelo amor infinito de toda a população."
    ],

    correta: 1,

    explicacao: "Maquiavel considera mais seguro para o governante ser temido do que amado."
}

];

/* =====================================================
   VARIÁVEIS
   ===================================================== */

let perguntaAtual = 0;
let pontuacao = 0;

/* =====================================================
   PRIMEIRO ACESSO
   ===================================================== */

window.addEventListener("load", () => {

    if (!localStorage.getItem("quizKlickKwiz")) {

        document.getElementById("quizModal").style.display = "flex";

        carregarPergunta();
    }
});

/* =====================================================
   CARREGAR PERGUNTA
   ===================================================== */

function carregarPergunta() {

    const pergunta = perguntas[perguntaAtual];

    document.getElementById("numeroPergunta").textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    document.getElementById("textoApoio").innerHTML =
        pergunta.textoApoio;

    document.getElementById("textoPergunta").textContent =
        pergunta.titulo;

    const alternativas =
        document.getElementById("alternativas");

    alternativas.innerHTML = "";

    const letras = ["A", "B", "C", "D", "E"];

    pergunta.alternativas.forEach((texto, indice) => {

        alternativas.innerHTML += `
            <button class="alternativa"
                onclick="verificarResposta(${indice})">

                <strong>${letras[indice]})</strong>
                ${texto}

            </button>
        `;
    });

    atualizarBarra();
}

/* =====================================================
   BARRA DE PROGRESSO
   ===================================================== */

function atualizarBarra() {

    const progresso =
        (perguntaAtual / perguntas.length) * 100;

    document.getElementById("barra").style.width =
        progresso + "%";
}

/* =====================================================
   VERIFICAR RESPOSTA
   ===================================================== */

function verificarResposta(indiceSelecionado) {

    const pergunta = perguntas[perguntaAtual];

    const alternativas =
        document.querySelectorAll(".alternativa");

    alternativas.forEach(btn => {
        btn.disabled = true;
    });

    if (indiceSelecionado === pergunta.correta) {

        alternativas[indiceSelecionado]
            .classList.add("correta");

        pontuacao++;

        document.getElementById("feedback").innerHTML =
            "✅ Resposta correta!";

    } else {

        alternativas[indiceSelecionado]
            .classList.add("errada");

        alternativas[pergunta.correta]
            .classList.add("correta");

        document.getElementById("feedback").innerHTML =
            "❌ Resposta incorreta!";
    }

    document.getElementById("explicacao").innerHTML =
        pergunta.explicacao;

    document.getElementById("proximo").style.display =
        "block";
}

/* =====================================================
   PRÓXIMA PERGUNTA
   ===================================================== */

function proximaPergunta() {

    perguntaAtual++;

    document.getElementById("feedback").innerHTML = "";
    document.getElementById("explicacao").innerHTML = "";

    document.getElementById("proximo").style.display =
        "none";

    if (perguntaAtual < perguntas.length) {

        carregarPergunta();

    } else {

        mostrarResultado();
    }
}

/* =====================================================
   RESULTADO FINAL
   ===================================================== */

function mostrarResultado() {

    const percentual =
        Math.round((pontuacao / perguntas.length) * 100);

    let medalha = "";

    if (pontuacao === 4) {

        medalha = "🥇 Medalha de Ouro";
        dispararConfete();

    } else if (pontuacao === 3) {

        medalha = "🥈 Medalha de Prata";

    } else if (pontuacao === 2) {

        medalha = "🥉 Medalha de Bronze";

    } else {

        medalha = "📚 Continue estudando";
    }

    document.getElementById("quizConteudo").innerHTML = `

        <h2>🎉 Quiz Finalizado!</h2>

        <p>Você acertou
        <strong>${pontuacao}</strong>
        de
        <strong>${perguntas.length}</strong>
        questões.</p>

        <h3>${percentual}% de aproveitamento</h3>

        <h2>${medalha}</h2>

        <button class="botaoFinal"
        onclick="fecharQuiz()">

        Começar a usar o Klick Kwiz

        </button>
    `;
}

/* =====================================================
   FECHAR QUIZ
   ===================================================== */

function fecharQuiz() {

    localStorage.setItem(
        "quizKlickKwiz",
        "respondido"
    );

    document.getElementById("quizModal")
        .style.display = "none";
}

/* =====================================================
   CONFETE
   ===================================================== */

function dispararConfete() {

    for (let i = 0; i < 100; i++) {

        const confete =
            document.createElement("div");

        confete.classList.add("confete");

        confete.style.left =
            Math.random() * 100 + "vw";

        confete.style.animationDelay =
            Math.random() * 2 + "s";

        document.body.appendChild(confete);
    }
}