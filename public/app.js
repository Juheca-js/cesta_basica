const loginButton = document.getElementsByClassName('forms_buttons-action');

// Agrega un evento de envío al formulario
loginButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Evita que se realice la acción de envío predeterminada

  // Obtén los valores de usuario y contraseña del formulario
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Crea un objeto con los datos del usuario
  const user = { username, password };

  try {
    // Realiza la solicitud POST al servidor utilizando Fetch API
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    // Verifica el estado de la respuesta
    if (response.ok) {
      // El inicio de sesión fue exitoso, redirige al usuario a la página de administrador
      window.location.href = '/admin.html'; // Reemplaza '/admin' con la ruta de la página de administrador
    } else {
      // El inicio de sesión falló, puedes mostrar un mensaje de error al usuario aquí
      console.error('Inicio de sesión fallido');
    }
  } catch (error) {
    // Hubo un error en la solicitud, puedes manejarlo de acuerdo a tus necesidades
    console.error('Error en la solicitud:', error);
  }
});