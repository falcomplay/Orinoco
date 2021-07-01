onLoadCartNumbers(); 

// Connection à l'api

fetch("http://localhost:3000/api/teddies")
    //Formatage au format JSON
    .then(productsList => productsList.json())
    //Création cart des produits
    .then(productsList => {
        tableauProducts(productsList)
    })
    //Gestion erreur
    .catch(function (error) {
        alert(error)
    })


// affichage du produit

function tableauProducts(productsList) {
    const mainProduct = document.getElementById("main")
    productsList.forEach(productList => {
        const divProduct = document.createElement("div")
        divProduct.classList.add("col-12", "col-md-6", "col-lg-4", "mb-5")
        divProduct.innerHTML = `            
          <div class="card mb-4 mb-lg-0 rounded shadow bg_Orinoco">
              <img src="${productList.imageUrl}" alt="${productList.name}" class="card-img-top pt-3 px-3">
              <div class="card-body">
              <h2 class="card-title h5">${productList.name}</h2>
              <p class="card-text">Prix : ${productList.price / 100}.00 €</p>
              <a href="product.html?id=${productList._id}" class="btn btn-Orinoco btn-block stretched-link">Adopter ${productList.name} ?</a>
              </div>
          </div>`
        mainProduct.appendChild(divProduct)
    })
}
