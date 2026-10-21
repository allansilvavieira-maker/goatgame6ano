// Banco de dados de perguntas (Nível 6º Ano - Ciências / Astronomia)
const questions = [
    {
        question: "Qual é a estrela central do nosso Sistema Solar?",
        options: ["A Lua", "O Sol", "Júpiter", "Marte"],
        correct: 1
    },
    {
        question: "Qual é o planeta conhecido por seus grandes e brilhantes anéis?",
        options: ["Terra", "Saturno", "Mercúrio", "Netuno"],
        correct: 1
    },
    {
        question: "Qual é o planeta mais próximo do Sol?",
        options: ["Marte", "Vênus", "Mercúrio", "Urano"],
        correct: 2
    },
    {
        question: "A Terra leva cerca de 365 dias para dar uma volta completa ao redor do Sol. Como se chama esse movimento?",
        options: ["Rotação", "Gravidade", "Translação", "Eclipse"],
        correct: 2
    },
    {
        question: "Qual é o único planeta conhecido do Sistema Solar que possui água líquida e vida?",
        options: ["Marte", "Terra", "Vênus", "Júpiter"],
        correct: 1
    }
];

// Variáveis de Controle de Estado do Jogo
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let answered = false;

// Seleção de Elementos do DOM
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const progressBar = document.getElementById("progress-bar");
const feedbackDisplay = document.getElementById("feedback");

const endTitle = document.getElementById("end-title");
const endMessage = document.getElementById("end-message");
const finalScoreVal = document.getElementById("final-score-val");

// Eventos Iniciais
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", resetGame);

// Função para Iniciar o Jogo
function startGame() {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    resetGameVariables();
    showQuestion();
}

// Reseta as variáveis para o estado inicial
function resetGameVariables() {
    currentQuestionIndex = 0;
    score = 0;
    lives = 3;
    scoreDisplay.innerText = score;
    updateLivesDisplay();
}

// Atualiza os corações na tela
function updateLivesDisplay() {
    livesDisplay.innerText = "❤️".repeat(lives) || "💀 Fim de Jogo";
}

// Mostra a pergunta atual
function showQuestion() {
    answered = false;
    nextBtn.classList.add("hidden");
    feedbackDisplay.classList.add("hidden");
    feedbackDisplay.className = ""; 
    optionsContainer.innerHTML = "";

    // Atualiza barra de progresso
    const progressPercent = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;

    // Cria os botões de alternativas
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

// Processa a escolha do aluno
function selectOption(selectedIndex, selectedButton) {
    if (answered) return; // Impede clicar em múltiplas opções
    answered = true;

    const currentQuestion = questions[currentQuestionIndex];
    const allButtons = optionsContainer.children;

    if (selectedIndex === currentQuestion.correct) {
        // Se acertou
        selectedButton.classList.add("correct");
        score += 10;
        scoreDisplay.innerText = score;
        showFeedback(true, "🌟 Muito bem! Você acertou!");
    } else {
        // Se errou
        selectedButton.classList.add("wrong");
        allButtons[currentQuestion.correct].classList.add("correct"); // Mostra a certa
        lives--;
        updateLivesDisplay();
        showFeedback(false, "🚀 Quase lá! Continue tentando!");
    }

    nextBtn.classList.remove("hidden");

    // Verifica se as vidas acabaram imediatamente
    if (lives <= 0) {
        setTimeout(endGame, 1500); // Dá um pequeno tempo para ver o feedback antes de acabar
    }
}

// Exibe mensagem lúdica de feedback
function showFeedback(isCorrect, message) {
    feedbackDisplay.innerText = message;
    feedbackDisplay.classList.remove("hidden");
    feedbackDisplay.classList.add(isCorrect ? "feedback-correct" : "feedback-wrong");
}

// Avança ou encerra o Quiz
function nextQuestion() {
    if (lives <= 0) return;

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        progressBar.style.width = "100%";
        endGame();
    }
}

// Tela de encerramento do jogo
function endGame() {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScoreVal.innerText = score;

    if (lives <= 0) {
        endTitle.innerText = "Fim da Linha, Recruta! 👨‍🚀";
        endMessage.innerText = "Suas vidas acabaram, mas o espaço guarda muitos mistérios. Tente novamente para vencer!";
    } else if (score === questions.length * 10) {
        endTitle.innerText = "Mestre do Universo! 👑🌟";
        endMessage.innerText = "Incrível! Você gabaritou todas as perguntas e provou ser um cientista espacial de elite!";
    } else {
        endTitle.innerText = "Missão Concluída! 🛸";
        endMessage.innerText = "Bom trabalho! Você concluiu a viagem pelo Sistema Solar com sucesso.";
    }
}

// Reinicia o jogo completo da tela final
function resetGame() {
    endScreen.classList.add("hidden");
    startGame();
}
