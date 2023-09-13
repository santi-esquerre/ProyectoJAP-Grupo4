document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (!isLoggedIn) {
    window.location.href = "login.html"; // Redirigir a la página de login
    return;
  }
});

document.getElementById("autos").addEventListener("click", function () {
  localStorage.setItem("CatID", 101);
  window.location = "products.html";
});
document.getElementById("juguetes").addEventListener("click", function () {
  localStorage.setItem("CatID", 102);
  window.location = "products.html";
});
document.getElementById("muebles").addEventListener("click", function () {
  localStorage.setItem("CatID", 103);
  window.location = "products.html";
});
