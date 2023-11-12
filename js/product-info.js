var comments = [];
var myComments = [];
var selectedStars = 0;
var navBar;

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
  let agregarAlCarrito = document.getElementById("agregarAlCarrito");

  agregarAlCarrito.addEventListener("click", () => {
    const productID = localStorage.getItem("selectedProductId");
    const productName = data.name;
    const productCost = data.cost;
    const productImage = data.images[0];
    const productCurrency = data.currency;
    let productCount = parseInt(document.getElementById("quantity").value) || 1;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    ObjProd = {
      id: productID,
      name: productName,
      image: productImage,
      cost: productCost,
      currency: productCurrency,
      count: productCount,
    };

    const prodIndex = cart.findIndex((product) => product.id === productID);

    if (prodIndex !== -1) {
      productCount += cart[prodIndex].count;
      cart.splice(prodIndex, 1);
      ObjProd.count = productCount;
      cart.push(ObjProd);
    } else {
      cart.push(ObjProd);
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Guarda el carrito actualizado

    const toastLiveExample = document.getElementById("liveToast");
    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  });

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
        <div class="card related-product" onclick="reloadProductInfo(${product.id})" style="cursor:pointer;">
          <img src="${product.image}" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <button class="btn btn-outline-dark flex-shrink-0" style="color:rgb(100, 100, 100); border-color:rgb(100, 100, 100);" onclick="reloadProductInfo(${product.id})"> <i class="fa fa-sign-out-alt"> </i> Ver más</button>
          </div>
        </div>
      </div>`;
  });
}

function fetchProductComment(id, myComments) {
  getJSONData(
    `https://japceibal.github.io/emercado-api/products_comments/${id}.json`
  )
    .then((result) => {
      comments = result.data;
      displayProductComments(comments.concat(myComments));
    })
    .catch((error) => {
      alert(error);
    });
}

function displayProductComments(comments) {
  let commentsContainer = document.getElementById("comments-container");
  commentsContainer.innerHTML = "<h2>Comentarios</h2>";
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
  window.location.reload();
  navBar.scrollIntoView();
}

function starPainting(stars) {
  stars.forEach((star, index) => {
    star.addEventListener("mouseenter", () => {
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add("checked");
      }
    });
    star.addEventListener("click", () => {
      selectedStars = index + 1;
      document.getElementById("score").value = selectedStars;
      stars.forEach((star) => {
        star.classList.remove("checked");
      });
      showStarSelection(stars);
    });
    star.addEventListener("mouseleave", () => {
      stars.forEach((star) => {
        star.classList.remove("checked");
      });
      showStarSelection(stars);
    });
  });
}

// Muestra la selección de estrellas, recibe un array de estrellas como parámetro
function showStarSelection(stars) {
  stars.forEach((star, index) => {
    index < selectedStars
      ? star.classList.add("checked")
      : star.classList.remove("checked");
  });
}

function getSelectedRating(stars) {
  let calificacion = 0;
  stars.forEach((star, index) => {
    if (star.classList.contains("checked")) {
      calificacion = index + 1;
    }
  });
  return calificacion;
}

function addComments(textArea, score, stars, myProductComments, productID) {
  // Obtiene el contenido del comentario y la puntuación
  const newCommentText = textArea.value;
  const newCommentScore = getSelectedRating(stars);

  // Evalua si se ingresó comentario valido
  if (
    newCommentText.trim() === "" ||
    isNaN(newCommentScore) ||
    newCommentScore < 1 ||
    newCommentScore > 5
  ) {
    alert("ERROR!, ingresa un comentario válido y una puntuación entre 1 y 5.");
    return;
  }

  // Crear un nuevo objeto (comentario)
  let newComment = {
    id: productID,
    description: newCommentText,
    score: newCommentScore,
    user: localStorage.getItem("username"),
    dateTime: new Date().toString(),
  };

  // Agregar el nuevo comentario
  myComments.push(newComment);
  myProductComments.push(newComment);

  // Limpiar el área de los comentarios
  textArea.value = "";
  score.value = "";

  selectedStars = 0;
  showStarSelection(stars);

  // Muestra todos los comentarios, incluido el nuevo
  displayProductComments(comments.concat(myProductComments));

  localStorage.setItem("myCommments", JSON.stringify(myComments));
}

document.addEventListener("DOMContentLoaded", function () {
  const productID = localStorage.getItem("selectedProductId");

  myComments = JSON.parse(localStorage.getItem("myCommments")) || [];
  var myProductComments = myComments.filter(
    (comment) => comment.id === productID
  );
  if (productID) {
    fetchProductInfo(productID);
    fetchProductComment(productID, myProductComments);
  } else {
    alert("No hay producto seleccionado.");
  }

  const stars = document.querySelectorAll(".star");
  starPainting(stars);

  const commentTextarea = document.getElementById("comment");
  const scoreInput = document.getElementById("score");
  const sendCommentButton = document.getElementById("send-comment");

  commentTextarea.value = "";

  // Agregar evento de clic al botón de enviar comentario
  sendCommentButton.addEventListener("click", function (e) {
    e.preventDefault();
    addComments(
      commentTextarea,
      scoreInput,
      stars,
      myProductComments,
      productID
    );
  });

  navBar = document.getElementsByTagName("nav")[0];
});
