function buscarPersona() {
  // Simulación de consulta a la base de datos
  const documento = document.getElementById("documento").value;
  const personaEncontrada = documento === "12345678"; // Ejemplo de número de documento

  if (personaEncontrada) {
    // Mostrar modal de persona encontrada
    const nombrePersona = "Juan Rivero Martinez"; // Este valor puede venir de la base de datos
    document.getElementById("nombrePersona").innerText = nombrePersona;
    const personaEncontradaModal = new bootstrap.Modal(
      document.getElementById("personaEncontradaModal")
    );
    personaEncontradaModal.show();
  } else {
    // Mostrar modal de persona no encontrada
    const personaNoEncontradaModal = new bootstrap.Modal(
      document.getElementById("personaNoEncontradaModal")
    );
    personaNoEncontradaModal.show();
  }
}
