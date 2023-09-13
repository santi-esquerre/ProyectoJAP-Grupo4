var comments = [];

function calcularDiferenciaDeTiempo(fechaString) {
  var ahora = new Date();
  var fecha = new Date(fechaString);
  var diferencia = ahora - fecha;
  var segundos = Math.floor(diferencia / 1000);
  var minutos = Math.floor(segundos / 60);
  var horas = Math.floor(minutos / 60);
  var dias = Math.floor(horas / 24);
  var semanas = Math.floor(dias / 7);
  var meses = Math.floor(dias / 30);
  var años = Math.floor(dias / 365);

  if (años > 0) {
    return `hace ${años} ${años === 1 ? "año" : "años"}`;
  } else if (meses > 0) {
    return `hace ${meses} ${meses === 1 ? "mes" : "meses"}`;
  } else if (semanas > 0) {
    return `hace ${semanas} ${semanas === 1 ? "semana" : "semanas"}`;
  } else if (dias > 0) {
    return `hace ${dias} ${dias === 1 ? "día" : "días"}`;
  } else if (horas > 0) {
    return `hace ${horas} ${horas === 1 ? "hora" : "horas"}`;
  } else if (minutos > 0) {
    return `hace ${minutos} ${minutos === 1 ? "minuto" : "minutos"}`;
  } else {
    return `hace ${segundos} ${segundos === 1 ? "segundo" : "segundos"}`;
  }
}

function fetchProductInfo(id) {
  getJSONData(`https://japceibal.github.io/emercado-api/products/${id}.json`)
    .then((result) => {
      chargeProductInfo(result.data);
    })
    .catch((error) => {
      alert(error);
    });
}

function chargeProductInfo(data) {
  let title = document.getElementById("prodTitle");
  let description = document.getElementById("prodDescription");
  let price = document.getElementById("prodPrice");
  let soldCount = document.getElementById("prodSoldCount");
  let productImages = document.getElementById("imgContainer");
  let oldPrice = document.getElementById("oldPrice");
  let relatedProducts = document.getElementById("relProdContainer");
  let carouselIndicators = document.getElementById("cIndicators");

  title.textContent = data.name;
  description.textContent = data.description;
  price.textContent =
    data.currency + " " + Intl.NumberFormat("es-ES").format(data.cost);
  soldCount.textContent += " " + data.soldCount;
  oldPrice.textContent =
    data.currency +
    " " +
    Intl.NumberFormat("es-ES").format(data.cost + data.cost * 0.5);
  data.images.forEach((image, index) => {
    productImages.innerHTML += `<div class="carousel-item">
              <img src="${image}" class="d-block img-thumbnail rounded mx-auto w-100" alt="..." />
            </div>`;
    carouselIndicators.innerHTML += `<button type="button" data-bs-target="#productCarousel" data-bs-slide-to="${index}" aria-current="true" aria-label="Slide ${index}"></button>`;
  });

  carouselIndicators.firstElementChild.classList.add("active");
  productImages.firstElementChild.classList.add("active");

  data.relatedProducts.forEach((product) => {
    relatedProducts.innerHTML += `<div class="col-md-3">
            <div class="card">
              <img src="${product.image}" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <button class="btn btn-primary" onclick="reloadProductInfo(${product.id})">Comprar</button>
              </div>
            </div>
          </div>`;
  });
}

function fetchProductComment(id) {
  getJSONData(
    `https://japceibal.github.io/emercado-api/products_comments/${id}.json`
  )
    .then((result) => {
      comments = result.data;
      displayProductComments(comments);
    })
    .catch((error) => {
      alert(error);
    });
}

function displayProductComments(comments) {
  let commentsContainer = document.getElementById("comments-container");
  if (comments.length > 0) {
    comments.forEach((comment) => {
      commentsContainer.innerHTML += `<hr>
      <div class="d-flex mb-3">
          <div id="star-container">
            <span class="fa fa-star ${
              comment.score >= 1 ? `checked` : ``
            }"></span>
            <span class="fa fa-star ${
              comment.score >= 2 ? `checked` : ``
            }"></span>
            <span class="fa fa-star ${
              comment.score >= 3 ? `checked` : ``
            }"></span>
            <span class="fa fa-star ${
              comment.score >= 4 ? `checked` : ``
            }"></span>
            <span class="fa fa-star ${
              comment.score >= 5 ? `checked` : ``
            }"></span>
          </div>
          <div class="ms-3" id="comment-content">
            <p>${comment.description}</p>
            <div class="text-muted">
              <span id="comment-user">Por: ${comment.user}</span>
              <span id="comment-date">${calcularDiferenciaDeTiempo(
                comment.dateTime
              )}</span>
            </div>
          </div>
        </div>`;
    });
    commentsContainer.innerHTML += `<hr>`;
  } else {
    commentsContainer.innerHTML += `<div class="text-center">No hay comentarios.</div>`;
  }
}
function reloadProductInfo(id) {
  localStorage.setItem("selectedProductId", id);
  location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
  const productID = localStorage.getItem("selectedProductId");

  if (productID) {
    fetchProductInfo(productID);
    fetchProductComment(productID);
  } else {
    alert("No hay producto seleccionado.");
  }
});
