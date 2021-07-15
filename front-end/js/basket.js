let teddyBasket = JSON.parse(localStorage.getItem("basket"))
//Build basket's header
const teddyName = document.getElementById("teddyH2Count")
const h2Name = document.createElement("h2")
h2Name.classList.add("h3", "text-center")
let addIdBasket = []
if (teddyBasket){
    if (teddyBasket.length > 1) {
        const h2Text = `Vous avez choisi ${teddyBasket.length} types d'oursons.`
        h2Name.innerHTML = h2Text
        teddyName.appendChild(h2Name)
        buildingBasket()
    } else if (teddyBasket.length == 1) {
        const h2Text = `Vous avez choisi ${teddyBasket.length} type d'ourson.`
        h2Name.innerHTML = h2Text
        teddyName.appendChild(h2Name)
        buildingBasket()
    }
} else { // If the basket is empty
    const h2Text = `Vous n'avez pas choisi d'ourson.`
    h2Name.innerHTML = h2Text
    teddyName.appendChild(h2Name)
    const teddyBasketNone = document.getElementById("teddiesBasketList")
    const divTeddyItemNone = document.createElement("div")
    divTeddyItemNone.classList.add("row", "p-0", "m-0", "align-items-center")
    const teddyBasketNoneContent = `
        <div class="col text-center">
        <p>Votre panier est vide... </p>
        <a href="index.html" class="btn btn-Orinoco btn-block stretched-link">revenir à l'accueil</a>
        </div>`
    divTeddyItemNone.innerHTML = teddyBasketNoneContent
    teddyBasketNone.appendChild(divTeddyItemNone)
}

// Building 
function buildingBasket(){
    i = 0
    productTotal = 0
    const teddyBasketItem = document.getElementById("teddiesBasketList")
    teddyBasket.forEach(teddyItem => {
        const divTeddyItem = document.createElement("div")
        divTeddyItem.classList.add("row", "p-0", "m-1", "bg-light", "justify-content-between", "align-items-center")
        const teddyBasketItemContent = `            
                <div class="col-2 p-1 d-none d-sm-block"><img src="${teddyItem.imageUrl}" alt="${teddyItem.name}" class="w-100 m-1"></div>
                <div class="col-5 col-md-4 p-1">${teddyItem.quantity}x ${teddyItem.name}</div>
                <div id="totalBasket" class="col-2  p-1">${teddyItem.quantity * teddyItem.price / 100} €</div>
                <div class="col-1  p-1 RemoveProduct" id="${i}">
                    <button type="button" class="close text-danger" aria-label="Supprimer">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
        divTeddyItem.innerHTML = teddyBasketItemContent
        teddyBasketItem.appendChild(divTeddyItem)
        productTotal = productTotal + teddyItem.quantity * teddyItem.price / 100;
        for (let i = 0; i < teddyItem.quantity; i++) {
        addIdBasket.push(teddyItem.id);
        localStorage.setItem("amountSale", productTotal);
        }
    })
}


    // Total basket

    const productBasketTotal = document.getElementById("productsBasketTotal")
        const divProductBasketTotal = document.createElement("div")
        const productBasketTotalContain = 
            `   <div class="col-6 p-0 m-0">pour un total de </div>
                <div class="col-6 p-0 m-0 text-right">${productTotal}.00 €</div>`
        divProductBasketTotal.innerHTML = productBasketTotalContain
        productBasketTotal.appendChild(divProductBasketTotal)


    // Remove product

    const RemoveProduct = document.getElementsByClassName("RemoveProduct")
    for (let i = 0; i < RemoveProduct.length; i++) {
        RemoveProduct[i].addEventListener("click", function(event){
            event.preventDefault()
            const DeleteId = this.closest(".RemoveProduct").id
                    //Remove article from local storage
                    teddyBasket.splice(DeleteId, 1)
                    //new localstorage
                    localStorage.setItem("basket", JSON.stringify(teddyBasket))
                    JSON.parse(localStorage.getItem("basket"))
                    //If last item clear local storage
                    if (RemoveProduct.length === 1) {localStorage.clear()}
                    window.location.href = "basket.html"
        })     
    }
// Setup form
// Input from the dom
function sendOrder() {
    let form = document.getElementById("form");
    if (form.reportValidity() == true && addIdBasket.length>0) {
      let contact = {
        'firstName': document.getElementById("inputFirstName").value,
        'lastName': document.getElementById("inputLastName").value,
        'address': document.getElementById("inputAddress").value,
        'city': document.getElementById("inputCity").value,
        'email': document.getElementById("inputEmail4").value
      };
      let products = addIdBasket;
  
      let formulaireClient = JSON.stringify({
        contact,
        products
      });
  
     // Send post request to the back-end
      fetch('http://localhost:3000/api/teddies/order', {
        method: 'POST',
        headers: {
          'content-type': "application/json"
        },
        mode: "cors",
        body: formulaireClient
        })
        .then(function (response) {
          return response.json()
        })
        .then(function (r) {
          localStorage.setItem("contact", JSON.stringify(r.contact));
          localStorage.setItem("numberSale", JSON.stringify(r.orderId));
          window.location = "confirm.html"
        })
        //If error
        .catch(function (err) {
          console.log("fetch Error");
        });
    }
    else{
      alert(" Une erreur est survenue votre panier est peux étre vide ou le formulaire n'a pas été correctement rempli!")
    };
  }
  
  let envoiFormulaire = document.getElementById("sendForm");
  
  envoiFormulaire.addEventListener('click', function (event) {
    event.preventDefault();
    sendOrder();
  });