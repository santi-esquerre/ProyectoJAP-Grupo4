document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "./login.html"; // Redirige al inicio de sesión si no está logueado
    return;
  }

  var dataImage = localStorage.getItem("imgData");
  if (dataImage) {
    let profileImg = document.getElementById("profile-img");
    profileImg.src = dataImage;
  }

  // Rellenar el campo de correo electrónico
  const email = localStorage.getItem("username");
  document.querySelector('input[name="email"]').value = email;

  // Obtener datos del perfil del localStorage (si existen)
  const nombre = localStorage.getItem("nombre") || "";
  const segundoNombre = localStorage.getItem("segundoNombre") || "";
  const apellido = localStorage.getItem("apellido") || "";
  const segundoApellido = localStorage.getItem("segundoApellido") || "";
  const telefono = localStorage.getItem("telefono") || "";

  // Rellenar los campos del perfil
  document.querySelector('input[name="nombre"]').value = nombre;
  document.querySelector('input[name="segundoNombre"]').value = segundoNombre;
  document.querySelector('input[name="apellido"]').value = apellido;
  document.querySelector('input[name="segundoApellido"]').value =
    segundoApellido;
  document.querySelector('input[name="telefono"]').value = telefono;

  // Se agrega un evento clic al botón de guardar
  const guardar = document.getElementById("guardarUsuario");
  guardar.addEventListener("click", () => {
    // Se obtienen los valores de los campos obligatorios
    const nombreUsuario = document.getElementById("nombre").value;
    const segundoNombreUsuario = document.getElementById("segundoNombre").value;
    const apellidoUsuario = document.getElementById("apellido").value;
    const segundoApellidoUsuario =
      document.getElementById("segundoApellido").value;
    const emailUsuario = document.getElementById("email").value;
    const telefonoUsuario = document.getElementById("telefono").value;

    // Confirma que los campos obligatorios tengan valor
    if (!nombreUsuario || !apellidoUsuario || !emailUsuario) {
      alert(
        "Por favor, complete los campos obligatorios (*) antes de guardar."
      );
      return; // No se guardan los datos si falta alguno de los campos obligatorios
    }

    // Guarda los datos en el almacenamiento local
    localStorage.setItem("nombre", nombreUsuario);
    localStorage.setItem("segundoNombre", segundoNombreUsuario);
    localStorage.setItem("apellido", apellidoUsuario);
    localStorage.setItem("segundoApellido", segundoApellidoUsuario);
    localStorage.setItem("email", emailUsuario);
    localStorage.setItem("telefono", telefonoUsuario);

    alert("Datos guardados exitosamente.");
  });
});

function saveProfilePhoto() {
  const fileInput = document.getElementById("Img");
  const file = fileInput.files[0];
  if (!file) {
    return;
  }
  document.getElementById("profile-img").src = URL.createObjectURL(file);

  const imgData = new FileReader();
  imgData.readAsDataURL(file);

  imgData.addEventListener("load", function () {
    localStorage.setItem("imgData", imgData.result);
  });
}

document.getElementById("Img").addEventListener("change", saveProfilePhoto);
