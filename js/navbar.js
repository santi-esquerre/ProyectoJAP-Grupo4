document.addEventListener("DOMContentLoaded", function () {
  // Obtener el nombre de usuario guardado
  const username = localStorage.getItem("username");
  // Obtener el elemento donde se mostrará el nombre de usuario
  const usernameDisplay = document.getElementById("username-display");
  // Obtener el botón de cerrar sesión
  const logoutButton = document.getElementById("logout-button");
  //Obtener el contenedor del menu de usuario
  const userMenu = document.getElementById("user-info");
  // Si se ha encontrado un nombre de usuario, mostrarlo en la página
  if (username) {
    usernameDisplay.textContent = `${username}`;
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
  }

  function toggleLogoutButton() {
    // Alternar la visibilidad del botón de cierre de sesión
    if (logoutButton.style.display === "none") {
      logoutButton.style.display = "block";
    } else {
      logoutButton.style.display = "none";
    }
  }

  userMenu.addEventListener("mouseenter", toggleLogoutButton);
  userMenu.addEventListener("mouseleave", toggleLogoutButton);

  logoutButton.addEventListener("click", logout);
});
