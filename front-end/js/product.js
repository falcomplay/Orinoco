basketCounter();

// Feetching Url
let params = new URL(document.location).searchParams;

// Get ID
const id = params.get("id");

let container = document.getElementById("main");

// Send to the local storage
const addLocalStorage = (basket) => {
	localStorage.setItem("basket", JSON.stringify(basket));
};

// Call API
fetch("http://localhost:3000/api/teddies/" + id)
	.then((response) => response.json())
	//Create frame for the teddy link with the id
	.then(function (product) {
		let teddy = new Teddy(product);
		display(teddy);
	})
	.catch((err) => {
		alert("Impossible de se connecter aux produits! " + err);
	});

// Display of the product
const display = (teddy) => {
	container.innerHTML += `  
  <div class="card mb-4 mb-lg-0 bg_Orinoco">
      <div class="addCartConfirmation">
            <p class="confirmation-text"></p>
      </div>
      <img src="${teddy.imageUrl}" alt="${teddy.name}" class="w-full lg:w-1/2 md:min-w-1/2 h-full p-3 img-fluid" id="card__img">
      <div class="card-body">
           <h2 class="card-title h3" id="card__title">${teddy.name}</h2>
           <p id="card__description">${teddy.description}</p>
          <div class="d-flex justify-content-around align-items-center mt-4">
          <select class="options optionForm" id ="option">
          </select>
         <p class="p-1 text-price"> Prix /u : ${teddy.price / 100}€</p>
         <select class="optionForm" id="quantity">           
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
         </select>      
          <div class="addCartConfirmation">
              <p class="confirmation-text"></p>
          </div>
            <a href="#" class="btn btn-Orinoco btn-block" id="add-product" data-action="add_cart">Ajouter au panier</a>
           </div>
       </div>
  </div>`;

	// Selector of colors
	for (let colors of teddy.colors) {
		document.getElementById("option").innerHTML += `<option value="${colors}">${colors}</option>`;
	}

	const confirmation = document.querySelector(".addCartConfirmation");
	const textConfirmation = document.querySelector(".confirmation-text");

	function confirmationAdd() {
		confirmation.style.visibility = "visible";
		textConfirmation.innerHTML = `  					
    <div class="alert alert-success alert-dismissible mt-3 fade show" role="alert">
    <h5 class="alert-heading">Vous avez ajouté ${teddy.quantity} nounours au panier !</h5>
  </div>`;
		setTimeout("location.reload(true);", 4000);
	}

	// Event at click on the button
	document.getElementById("add-product").addEventListener("click", function () {
		addProductBasket(teddy);
		confirmationAdd();
	});
};

// Add product to the basket
const addProductBasket = (teddy) => {
	teddy.quantity = parseInt(document.getElementById("quantity").value);

	// Fetch basket on local storage //memo : let variable=(condition)? "value if true": "value if wrong"
	let basket = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];

	// Increment product
	let teddyExist = false;
	for (let i = 0; i < basket.length; i++) {
		let product = basket[i];
		//Condition in case the product exist
		if (product.id === teddy.id) {
			teddyExist = i;
		}
	}
	// Product exist in the basket
	if (false !== teddyExist) {
		basket[teddyExist].quantity = parseInt(basket[teddyExist].quantity) + teddy.quantity;
	} else {
		basket.push(teddy);
	}
	addLocalStorage(basket);
};
