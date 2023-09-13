let productsArray;

function showProductList(array) {
  let productContainer = document.getElementById("pro-list-container");
  let htmlContentToAppend = "";
  array.forEach((product) => {
    htmlContentToAppend += `
      <div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
          <div class="col-3">
            <img src="${
              product.image
            }" alt="product image" class="img-thumbnail">
          </div>
          <div class="col">
            <div class="d-flex w-100 justify-content-between">
              <div class="mb-1">
                <h4>${product.name} - ${product.currency} ${Intl.NumberFormat(
      "es-ES"
    ).format(product.cost)}</h4>
                <p>${product.description}</p>
              </div>
              <small class="text-muted">${product.soldCount} vendidos</small>
            </div>
          </div>
        </div>
      </div>`;
  });
  array.length === 0
    ? (productContainer.innerHTML = `<div class="text-center">No hay productos.</div>`)
    : (productContainer.innerHTML = htmlContentToAppend);
}

// Agrega un evento click a cada producto en la lista
function attachProductClickEvent() {
  const productItems = document.querySelectorAll(".list-group-item");
  productItems.forEach((product, index) => {
    product.addEventListener("click", () => {
      // Obtiene el identificador del producto seleccionado
      const selectedProductId = productsArray[index].id;

      // Guarda el identificador en el almacenamiento local
      localStorage.setItem("selectedProductId", selectedProductId);

      // Se redirige al usuario a product-info.html
      window.location.href = "product-info.html";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const CatID = localStorage.getItem("CatID");
  if (CatID) {
    const LIST_URL = `https://japceibal.github.io/emercado-api/cats_products/${CatID}.json`;

    getJSONData(LIST_URL)
      .then((resultObj) => {
        productsArray = resultObj.data.products;
        showProductList(productsArray);
        document.getElementById("nombre_articulo");
        nombre_articulo.textContent = resultObj.data.catName;

        // Se llama a la función para adjuntar el evento de clic a los productos
        attachProductClickEvent();
      })
      .catch((error) => {
        alert(error);
      });
  }
  function ordenarPorPrecioAscendente() {
    productsArray.sort((a, b) => a.cost - b.cost);
    showProductList(productsArray);
  }

  function ordenarPorPrecioDescendente() {
    productsArray.sort((a, b) => b.cost - a.cost);
    showProductList(productsArray);
  }

  function ordenarPorMasVendidos() {
    productsArray.sort((a, b) => b.soldCount - a.soldCount);
    showProductList(productsArray);
  }

  function ordenarPorMenosVendidos() {
    productsArray.sort((a, b) => a.soldCount - b.soldCount);
    showProductList(productsArray);
  }

  const orderBy = document.getElementById("orderBy");
  orderBy.addEventListener("change", () => {
    if (orderBy.value === "sortByPriceAsc") {
      ordenarPorPrecioAscendente();
    } else if (orderBy.value === "sortByPriceDesc") {
      ordenarPorPrecioDescendente();
    } else if (orderBy.value === "sortByCountAsc") {
      ordenarPorMasVendidos();
    } else if (orderBy.value === "sortByCountDesc") {
      ordenarPorMenosVendidos();
    }
  });
  const productSearch = document.getElementById("productSearch");

  productSearch.addEventListener("input", (e) => {
    let value = e.target.value;
    const filteredProducts = productsArray.filter((product) => {
      return product.name.toLowerCase().includes(value);
    });
    if (value && value.trim().length > 0) {
      value = value.trim().toLowerCase();
      showProductList(filteredProducts);
    } else {
      showProductList(productsArray);
    }
  });

  const filterBtn = document.getElementById("rangeFilterPrice");
  filterBtn.addEventListener("click", () => {
    const minPrice = document.getElementById("priceMin").value || 0;
    const maxPrice = document.getElementById("priceMax").value || Infinity;
    const filterProducts = productsArray.filter((product) => {
      return product.cost >= minPrice && product.cost <= maxPrice;
    });

    showProductList(filterProducts);
  });

  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("productSearch").value = "";
      document.getElementById("priceMin").value = "";
      document.getElementById("priceMax").value = "";
      showProductList(productsArray);
    });
});
