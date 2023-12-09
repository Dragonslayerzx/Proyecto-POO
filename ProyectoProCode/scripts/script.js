//Capturando informacion de usuario en registro
const formulario = document.getElementById("datosUsuario");
formulario
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    let usuario = document.getElementById("usuario").value;
    let correo = document.getElementById("correo").value;
    let password = document.getElementById("password").value;

    let userData = { usuario: usuario, correo: correo, password: password };
    let userDataJson = JSON.stringify(userData);
    //console.log(userData);

    // mandando la transaccion al backend
    fetch("http://localhost:3000/api/users", {
      method: "Post",
      body: userDataJson, //cuerpo de la request
    }).then(response => response.json())
    .then(data => {
      if (data.message === 'El correo electrónico ya está registrado') {
        // Disparar un evento personalizado para manejar el mensaje de error
        document.dispatchEvent(new CustomEvent('emailInUse'));
      } else {
        // Disparar un evento personalizado para indicar que el usuario se creó correctamente
        document.dispatchEvent(new CustomEvent('userCreated'));
      }
    })
    .catch(error => {
      console.error('Error al procesar la solicitud:', error);
    });
  });
  


// Funciones para enlazar las paginas

function getLogin() {
  window.location.href = "login.html";
}

function getRegister() {
  window.location.href = "register.html";
}

function getEditor(){
window.location.href = "Editor.html";
}

function getNewfolder(){
window.location.href = "Newfolder.html";
}

function getArchivo(){
window.location.href = "Archivo.html";
}

/*function getPrincipal() {
    window.location.href = "Principal.html";
}*/
