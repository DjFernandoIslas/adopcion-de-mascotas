function confirmarEliminacion() {
    var confirmacion = confirm("¿Estás seguro de que deseas eliminar los datos de este usuario?");
    if (confirmacion) {
      document.getElementById("formEliminar").submit();
    } else {
    }
  }