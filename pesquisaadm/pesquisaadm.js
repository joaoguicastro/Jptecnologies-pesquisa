let currentQuestionIndex = 0;
let questions = [];

function loadQuestions() {
    fetch('../acessoadm/criacao.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
        })
        .catch(error => console.error('Erro ao carregar perguntas:', error));
}

function changeContent() {
    const btnChangeContent = document.getElementById("btnChangeContent");
    const contentDiv = document.querySelector(".content");
    const ratingContainer = document.getElementById("ratingContainer");

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        contentDiv.innerHTML = `
        <div class="title">${question.title}</div>
        <div class="description">${question.description}</div>
        `;
        ratingContainer.classList.remove("hidden");
        btnChangeContent.textContent = "Próxima";
        currentQuestionIndex++;
    } else {
        contentDiv.innerHTML = `
        <div class="title">Pronto finalizado</div>
        <div class="description">Obrigado por responder nossa pesquisa de satisfação</div>
        `;
        ratingContainer.classList.add("hidden");
        btnChangeContent.textContent = "Voltar";
        btnChangeContent.onclick = function () {
            window.location.href = "../principal/principal.html";
        }
    }

    document.querySelectorAll('.star-widget input').forEach(input => {
        input.checked = false;
    });
    changeRating(0);
}
window.onload = loadQuestions;
function loadQuestions() {
  if(localStorage.getItem('questions')) {
      questions = JSON.parse(localStorage.getItem('questions'));
  } else {
      questions = [];
  }
}
window.onload = loadQuestions;
