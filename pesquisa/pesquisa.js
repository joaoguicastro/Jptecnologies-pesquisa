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
    const btnChangeContent = document.getElementById("btnSubmit");
    const contentDiv = document.querySelector(".content");
    const ratingContainer = document.getElementById("ratingContainer");

    const textArea = document.querySelector('.star-widget .textarea textarea');
    textArea.value = '';

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        contentDiv.innerHTML = `
        <div class="title">${question.title}</div>
        <div class="description">${question.description}</div>
        `;
        ratingContainer.classList.remove("hidden");
        btnChangeContent.textContent = "Próxima";
        submitSurvey();
        
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
function submitSurvey() {
    const rateInputs = document.querySelectorAll('.star-widget input');
    const textArea = document.querySelector('.star-widget .textarea textarea');
    let rateValue;
    rateInputs.forEach(input => {
        if (input.checked) {
            rateValue = parseInt(input.id.split('-')[1]); 
        }
    });

    const survey = {
        name: "Usuario 1",
        satisfaction: rateValue,
        comments: textArea.value,
        userId: 1  
    };

    console.log('Submitting survey:', survey);

    fetch('http://localhost:3000/survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(survey)
    }).then(response => response.json())
      .then(data => {
        console.log('Sucesso:', data);
      })
      .catch((error) => {
        console.error('Erro:', error);
      });
}

document.getElementById('btnSubmit').addEventListener('click', submitSurvey);
function changeQuestion() {
    console.log('Button clicked');
    const textArea = document.querySelector('.star-widget .textarea textarea');
    textArea.value = '';
}
document.getElementById('btnSubmit').addEventListener('click', changeQuestion);
function changeRating(value) {
    const ratingValue = document.getElementById('rating-value');
    ratingValue.textContent = value;
  }

  document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var feedback = document.getElementById('userFeedback').value;
    var rate = 0;

    // Descobre qual das opções de avaliação foi selecionada
    for (var i = 1; i <= 5; i++) {
        var radio = document.getElementById('rate-' + i);
        if (radio.checked) {
            rate = i;
            break;
        }
    }

    if (rate === 0 || feedback === '') {
        alert('Por favor, preencha todos os campos');
        return;
    }

    var feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

    feedbacks.push({
        rate: rate,
        feedback: feedback
    });

    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

    // Limpa os campos depois de enviar
    for (var i = 1; i <= 5; i++) {
        var radio = document.getElementById('rate-' + i);
        radio.checked = false;
    }
    document.getElementById('userFeedback').value = '';
});
