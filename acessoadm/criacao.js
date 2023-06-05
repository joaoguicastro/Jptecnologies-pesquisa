window.onload = function() {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    
    if (questions.length > 0) {
        document.getElementById('questionList').style.display = 'block';
    }

    for(let i = 0; i < questions.length; i++) {
        addQuestionToList(questions[i].title, questions[i].description, i);
    }
}

document.getElementById('newQuestionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const questionTitle = document.getElementById('questionTitle').value;
    const questionDescription = document.getElementById('questionDescription').value;

    let questions;
    if(localStorage.getItem('questions')) {
        questions = JSON.parse(localStorage.getItem('questions'));
    } else {
        questions = [];
    }

    questions.push({
        title: questionTitle,
        description: questionDescription
    });

    localStorage.setItem('questions', JSON.stringify(questions));

    addQuestionToList(questionTitle, questionDescription, questions.length - 1);

    document.getElementById('questionTitle').value = '';
    document.getElementById('questionDescription').value = '';
    
    document.getElementById('questionList').style.display = 'block';

    alert('Pergunta adicionada com sucesso!');
});

function addQuestionToList(title, description, index) {
    const questionList = document.getElementById('questionList');
    const questionElement = document.createElement('div');

    questionElement.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <button onclick="removeQuestion(${index})">Remover</button>
    `;

    questionList.appendChild(questionElement);
}

function removeQuestion(index) {
    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    questions.splice(index, 1);
    localStorage.setItem('questions', JSON.stringify(questions));

    if (questions.length === 0) {
        document.getElementById('questionList').style.display = 'none';
    }
    
    location.reload();
}
