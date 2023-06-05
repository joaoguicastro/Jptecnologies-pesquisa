// async function submitLoginForm(event) {
//     event.preventDefault();
  
//     const username = document.getElementById('user').value;
//     const password = document.getElementById('password').value;
  
//     try {
//       const response = await fetch('/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//       });
  
//       if (response.ok) {
//         window.location.href = '../principal/principal.html';
//       } else {
//         const errorData = await response.json();
//         const errorMessage = errorData.error;
//         const errorElement = document.getElementById('error-message');
//         errorElement.textContent = errorMessage;
//         errorElement.style.display = 'block';
//       }
//     } catch (error) {
//       console.error('Ocorreu um erro ao enviar a requisição de login:', error);
//     }
//   }
  
// document.querySelector('#login-btn button').addEventListener('click', submitLoginForm);

document.getElementById('login-btn').addEventListener('click', function(e) {
  e.preventDefault();

  var username = document.getElementById('user').value;
  var password = document.getElementById('password').value;

  var users = [
      {
          username: "adm",
          password: "adm123"
      },
      {
          username: "usuario",
          password: "12345"
      }
  ]

  var isAuthenticated = users.some(function(user) {
      return user.username === username && user.password === password;
  });

  if(isAuthenticated){
      alert("Login bem-sucedido!");
      location.href = username == "adm" ? "../principaladm/principaladm.html" : "../principal/principal.html";
  } else {
      alert("Usuário ou senha incorretos!");
  }
});
