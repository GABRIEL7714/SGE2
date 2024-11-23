document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("ambienteForm");
  const cancelarBtn = document.getElementById("cancelarBtn");
  const adaptarBtn = document.getElementById("adaptarBtn");

  // Evento para el botón "Cancelar"
  cancelarBtn.addEventListener("click", function () {
    formulario.reset(); // Resetea el formulario
    window.location.href = `/AsignarAmbiente`; // Redirecciona
  });

  // Evento para el botón "Adaptar Ambiente"
  adaptarBtn.addEventListener("click", function () {
    // Aquí puedes agregar lógica específica para adaptar un ambiente
    alert("Adaptando ambiente...");
  });

  // Evento para el botón "Guardar"
  formulario.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevenir el envío por defecto del formulario

    // Obtener los valores de los campos del formulario
  
    const ubicacion = document.getElementById("ubicacion").value.trim();
    const capacidad = parseInt(document.getElementById("capacidad").value, 10);
    const disponible = document.getElementById("disponible").checked; // true o false



    // Validar los campos
    if ( ubicacion && capacidad && disponible) {
      try {
        // Hacer una solicitud POST al endpoint para guardar el ambiente
        const response = await fetch("http://localhost:5000/createAmbiente", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ubicacion,
            capacidad,
            disponible,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Ambiente guardado en el servidor:", result);
          alert("Ambiente guardado correctamente!");
          formulario.reset(); // Limpiar el formulario
        } else {
          console.error("Error al guardar el ambiente:", response.statusText);
          alert("Hubo un error al guardar el ambiente. Inténtelo de nuevo.");
        }
      } catch (error) {
        console.error("Error de red o en el servidor:", error);
        alert("Ocurrió un problema al guardar el ambiente.");
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  });
});
