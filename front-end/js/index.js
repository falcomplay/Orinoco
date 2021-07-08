basketCounter()

fetch("http://localhost:3000/api/teddies")
    //Formatting into json
    .then(response => response.json())
    //Create for each teddy a display
    .then(productsList => {
        for (let product of productsList){
            let teddy = new Teddy(product)
        display(teddy)
        }

    })
    //Error case
    .catch(function (error) {
        alert(error)
    });

const mainProduct = document.getElementById("main")

const display = teddy => {
    mainProduct.innerHTML += `            
    <div class="col-12 col-md-6 col-lg-4 mb-5">
        <div class="card mb-4 mb-lg-0 rounded shadow bg_Orinoco">
            <img src="${teddy.imageUrl}" alt="${teddy.name}" class="card-img-top imgsize pt-3 px-3">
            <div class="card-body">
            <h2 class="card-title h5">${teddy.name}</h2>
            <p class="card-text">Prix : ${teddy.price / 100}.00 €</p>
            <a href="product.html?id=${teddy.id}" class="btn btn-Orinoco btn-block stretched-link">Voir ${teddy.name}</a>
            </div>
        </div>
    </div>`
};