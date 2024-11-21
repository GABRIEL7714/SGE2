document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("ambienteForm");
  const cancelarBtn = document.getElementById("cancelarBtn");
  const adaptarBtn = document.getElementById("adaptarBtn");
  const guardarBtn = document.getElementById("guardarBtn");

  // Evento para el botón cancelar
  cancelarBtn.addEventListener("click", function () {
    formulario.reset();
    window.location.href = `/AsignarAmbiente`;
  });

  // Evento para el botón adaptar ambiente
  adaptarBtn.addEventListener("click", function () {
    // Aquí puedes agregar cualquier lógica para "adaptar" el ambiente
    // por ejemplo, validar o ajustar los datos
    alert("Adaptando ambiente...");
  });

  // Evento para el botón guardar
  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el envío del formulario
    // Obtener los valores de los campos
    const nombre = document.getElementById("nombre").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const capacidad = document.getElementById("capacidad").value;
    const detalles = document.getElementById("detalles").value;

    // Validar que todos los campos estén llenos
    if (nombre && ubicacion && capacidad && detalles) {
      // Aquí se pueden procesar los datos, por ejemplo enviarlos a una API o almacenarlos
      console.log("Ambiente guardado:", {
        nombre,
        ubicacion,
        capacidad,
        detalles,
      });
      alert("Ambiente guardado correctamente!");
      formulario.reset(); // Limpiar el formulario después de guardar
    } else {
      alert("Por favor, complete todos los campos.");
    }
  });
});
