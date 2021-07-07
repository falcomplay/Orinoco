const teddyBasket = JSON.parse(localStorage.getItem("basket"))
const teddyName = document.getElementById("teddyH2Count")
const h2Name = document.createElement("h2")
h2Name.classList.add("h3", "text-center", "text-primary")
if (teddyBasket){
    if (teddyBasket.length > 1) {
        const h2Text = `Vous avez choisi ${teddyBasket.length} oursons.`
        h2Name.innerHTML = h2Text
        teddyName.appendChild(h2Name)
        ConstrusctionDuPanier()
    } else if (teddyBasket.length == 1) {
        const h2Text = `Vous avez choisi ${teddyBasket.length} ourson.`
        h2Name.innerHTML = h2Text
        teddyName.appendChild(h2Name)
        ConstrusctionDuPanier()
    }
} else {
    const h2Text = `Vous n'avez pas choisi d'ourson.`
    h2Name.innerHTML = h2Text
    teddyName.appendChild(h2Name)
    //Construction d'un panier vide...
    const teddyBasketNone = document.getElementById("teddiesBasketList")
    const divTeddyItemNone = document.createElement("div")
    divTeddyItemNone.classList.add("row", "p-0", "m-0", "align-items-center")
    const teddyBasketNoneContent = `
        <div class="col text-center">
        <p>Votre panier est vide... </p>
        <a href="index.html" class="btn btn-primary btn-block stretched-link">revenir à l'accueil</a>
        </div>`
    divTeddyItemNone.innerHTML = teddyBasketNoneContent
    teddyBasketNone.appendChild(divTeddyItemNone)
}


function ConstrusctionDuPanier(){
    i = 0
    productTotal = 0
    const teddyBasketItem = document.getElementById("teddiesBasketList")
    teddyBasket.forEach(teddyItem => {
        const divTeddyItem = document.createElement("div")
        divTeddyItem.classList.add("row", "p-0", "m-1", "bg-light", "justify-content-between", "align-items-center")
        //console.log(teddyItem[i])
        const teddyBasketItemContent = `            
                <div class="col-2 p-1 d-none d-sm-block"><img src="${teddyItem.imageUrl}" alt="${teddyItem.name}" class="w-100 m-1"></div>
                <div class="col-5 col-md-4 p-1">1x ${teddyItem.name}</div>
                <div class="col-4 col-md-3 p-1">${teddyItem.quantity}</div>
                <div class="col-2  p-1">${teddyItem.quantity * teddyItem.price / 100} €</div>
                <div class="col-1  p-1 RemoveProduct" id="${i}">
                    <button type="button" class="close text-danger" aria-label="Supprimer">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
        divTeddyItem.innerHTML = teddyBasketItemContent
        teddyBasketItem.appendChild(divTeddyItem)
        i++
        productTotal = productTotal + teddyItem.quantity * teddyItem.price / 100
    })

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
                    //on supprime l'article du localStorage
                    teddyBasket.splice(DeleteId, 1)
                    //on réécris le nouveau localstorage
                    localStorage.setItem("basket", JSON.stringify(teddyBasket))
                    JSON.parse(localStorage.getItem("basket"))
                    //si c'est le dernier article, on supprime le localstorage
                    if (RemoveProduct.length === 1) {localStorage.clear()}
                    //on recharge la page
                    window.location.href = "basket.html"
        })     
    }
}

// Utilisation de l'API validation 

document.getElementById("btn-confirm").addEventListener("click",function(){
    var valid = true;
    for(let input of document.querySelectorAll(".form-validate")){
        valid &= input.checkValidity();
        if(!valid){
            break;
        }
    }
    if(valid){
        localStorage.setItem("amountSale", productTotal);
        sendOrder()
        
    }
})


function sendOrder() {
    const firstname = document.getElementById("firstName").value
    const lastname = document.getElementById("lastName").value
    const adress = document.getElementById("inputAddress").value
    const zipcode = document.getElementById("inputZip").value
    const email = document.getElementById("inputEmail4").value
    const city = document.getElementById("inputCity").value
    
    const order = {
      contact: {
        firstName: firstname,
        lastName: lastname,
        address: adress + " " + zipcode,
        city: city,
        email: email,
      }
    }

  
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(order),
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  
    fetch(`http://localhost:3000/api/teddies/order`, requestOptions)
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        localStorage.removeItem("basket")
        document.location.href = "confirm.html";
      })
      .catch(() => {
        alert(error)
      })
  }
  