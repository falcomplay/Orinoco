//Building basket link with counter

function basketCounter(){
    const teddyBasket = JSON.parse(localStorage.getItem("basket"))
    const basketCount = document.getElementById("cart")
    const basketLink = document.createElement("a")
    basketLink.classList.add("nav-link", "text-primary", "h5")
    basketLink.setAttribute("href", "basket.html")
    if (teddyBasket){
        basketLink.innerHTML = `Panier <span class="badge badge-pill badge-dark text-light">${teddyBasket.length}</span>`
    } else{
        basketLink.innerHTML = `Panier <span class="badge badge-pill badge-dark text-light">0</span>`
    }
    basketCount.appendChild(basketLink)
}
