// Simulación de datos que obtendrías del backend
const ambienteData = {
  nombre: "N201",
  ubicacion: "Sede Sucre",
  capacidad: 50,
  detalles: "Salón grande con proyector.",
};

// Función que carga los datos en los campos del formulario
function cargarDatos() {
  // Obtener los elementos del formulario
  const nombre = document.getElementById("nombre");
  const ubicacion = document.getElementById("ubicacion");
  const capacidad = document.getElementById("capacidad");
  const detalles = document.getElementById("detalles");

  // Asignar los valores del objeto a los campos
  nombre.value = ambienteData.nombre;
  ubicacion.value = ambienteData.ubicacion;
  capacidad.value = ambienteData.capacidad;
  detalles.value = ambienteData.detalles;
}

// Ejecutar la función cuando se cargue la página
window.onload = function () {
  cargarDatos();
};

// Evento para el botón de guardar (enviar el formulario)
document
  .getElementById("guardarBtn")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevenir el envío del formulario por defecto

    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const capacidad = document.getElementById("capacidad").value;
    const detalles = document.getElementById("detalles").value;

    // Aquí iría el código para enviar los datos al backend
    console.log("Datos enviados:", { nombre, ubicacion, capacidad, detalles });

    // Puedes usar una función AJAX o Fetch para enviar estos datos al servidor
    // fetch('/editar-ambiente', {
    //   method: 'POST',
    //   body: JSON.stringify({ nombre, ubicacion, capacidad, detalles }),
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(response => response.json())
    //   .then(data => console.log(data));
  });

// Evento para el botón de cancelar (resetear el formulario o redirigir)
document.getElementById("cancelarBtn").addEventListener("click", function () {
  // Aquí puedes agregar lógica para cancelar o resetear el formulario
  window.location.href = "/AsignarAmbiente"; // Ejemplo de redirección a otra página
});
