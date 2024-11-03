function designarRol(rol) {
  window.location.href = `/DesignarRol?rol=${rol}`;
}
document.getElementById("volverButton").addEventListener("click", function () {
  window.history.back();
});
