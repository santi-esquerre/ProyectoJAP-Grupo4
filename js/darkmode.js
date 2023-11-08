document.addEventListener("DOMContentLoaded", function () {
  const btnmode = document.getElementById("mode-toggle");
  let isEnabled = DarkReader.isEnabled();
  let selectedMode = localStorage.getItem("darkMode");
  const imgLight = document.getElementById("jumbotron");
  const imgDark = document.getElementById("jumbotronDark")

  if (selectedMode === "true") {
    DarkReader.enable({
      brightness: 100,
      contrast: 90,
      sepia: 0,
    });
    isEnabled = true;
    imgLight.classList.add("d-none");
    imgDark.classList.remove("d-none")
  } else {
    DarkReader.disable();
    isEnabled = false;
  }

  function changeButton() {
    if (isEnabled) {
      btnmode.innerHTML = `<i class="fa fa-sun"></i> Modo Claro`;
    } else {
      btnmode.innerHTML = `<i class="fa fa-moon"></i> Modo Oscuro`;
    }
  }

  changeButton();

  btnmode.addEventListener("click", () => {
    if (isEnabled) {
      DarkReader.disable();
      imgLight.classList.remove("d-none");
      imgDark.classList.add("d-none")
    } else {
      DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 0,
      });
      imgLight.classList.add("d-none");
      imgDark.classList.remove("d-none")
    }
    isEnabled = !isEnabled;
    changeButton();

    localStorage.setItem("darkMode", isEnabled.toString());
  });
});
