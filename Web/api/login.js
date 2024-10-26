const mensajeError = document.getElementsByName("error")[0];

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value;
  const contraseña = document.getElementById("contraseña").value;

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ correo, contraseña }),
    });

    if (!res.ok) {
      mensajeError.classList.remove("escondido");
      mensajeError.style.display = "block";
      return;
    }

    const reJson = await res.json();

    if (reJson.redirect) {
      window.location.href = reJson.redirect;
    }
  } catch (error) {
    console.error("Error en la solicitud: ", error);
  }
});
