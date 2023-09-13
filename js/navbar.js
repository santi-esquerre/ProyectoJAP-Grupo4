document.addEventListener("DOMContentLoaded", function () {
  // Obtener el nombre de usuario guardado
  const username = localStorage.getItem("username");
  // Obtener el elemento donde se mostrará el nombre de usuario
  const usernameDisplay = document.getElementById("username-display");
  // Obtener el botón de cerrar sesión
  const userDropDown = document.getElementById("user-DropDown");
  //Obtener el contenedor del menu de usuario
  const userMenu = document.getElementById("user-info");
  //Obtener el botón de cerrar sesión
  const logoutButton = document.getElementById("logout");
  // Si se ha encontrado un nombre de usuario, mostrarlo en la página
  if (username) {
    usernameDisplay.textContent = `${username}`;
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
  }

  function toggleUserMenu() {
    // Alternar la visibilidad del botón de cierre de sesión
    if (userDropDown.style.display === "none") {
      userDropDown.style.display = "block";
    } else {
      userDropDown.style.display = "none";
    }
  }

  userMenu.addEventListener("mouseenter", toggleUserMenu);
  userMenu.addEventListener("mouseleave", toggleUserMenu);

  logoutButton.addEventListener("click", logout);
});
