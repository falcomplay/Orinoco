//Building basket link with counter

function basketCounter() {
	const teddyBasket = JSON.parse(localStorage.getItem("basket"));
	const basketCount = document.getElementById("cart");
	const basketLink = document.createElement("a");
	basketLink.classList.add("nav-link", "h5", "ms-1");
	basketLink.setAttribute("href", "basket.html");
	if (teddyBasket) {
		basketLink.innerHTML = `<i class="fas fa-shopping-basket me-2"></i> Panier <span>${teddyBasket.length}</span>`;
	} else {
		basketLink.innerHTML = `<i class="fas fa-shopping-basket me-2"></i> Panier <span>0</span>`;
	}
	basketCount.appendChild(basketLink);
}
