const mensajeError = document.getElementsByName("error")[0];

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value; // El campo para el correo
  const contraseña = document.getElementById("contraseña").value; // El campo para la contraseña

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo, // Enviar correo
        contraseña, // Enviar contraseña
      }),
    });

    console.log("bien1");

    if (!res.ok) {
      const mensajeError = document.getElementsByName("error")[0];
      mensajeError.classList.toggle("escondido", false); // Mostrar mensaje de error si es necesario
      return;
    }

    console.log("bien2");

    const reJson = await res.json(); // Asegúrate de que se parsea la respuesta a JSON
    console.log("bien3", reJson);

    if (reJson.redirect) {
      window.location.href = reJson.redirect; // Redirigir a la ruta que envió el servidor
    }

    console.log("bien4");
  } catch (error) {
    console.error("Error en la solicitud: ", error);
  }
});
