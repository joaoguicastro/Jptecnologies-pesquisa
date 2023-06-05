document.getElementById('confirm-btn').addEventListener('click', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
  
    fetch('http://localhost:3000/forgot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Erro:', data.error);
        alert('Erro ao recuperar a senha. Por favor, tente novamente.');
      } else {
        alert('Uma nova senha foi enviada para o seu email.');
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
      alert('Erro ao recuperar a senha. Por favor, tente novamente.');
    });
  });
  