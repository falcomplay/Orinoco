const teddyBasket = JSON.parse(localStorage.getItem("basket"))
const teddyName = document.getElementById("teddyH2Count")
const h2Name = document.createElement("h2")
h2Name.classList.add("h3", "text-center")
// Building header basket
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
        //console.log(teddyItem[i])
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


function checkFormAndPostRequest() {

    // On récupère les inputs depuis le DOM.
    let submit = document.getElementById("sendForm");
    let inputName = document.getElementById("inputFirstName")
    let inputLastName = document.getElementById("inputLastName")
    let inputAdress = document.getElementById("inputAddress")
    let inputPostal = document.getElementById("inputZip")
    let inputMail = document.getElementById("inputEmail4")
    let inputCity = document.getElementById("inputCity")
    let inputCheck = document.getElementById("gridCheck")
  
    // Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur, on empêche l'envoi du formulaire. On vérifie aussi que le numéro est un nombre, sinon même chose.
    submit.addEventListener("click", (e) => {
      if (
        !inputName.value ||
        !inputLastName.value ||
        !inputPostal.value ||
        !inputCity.value ||
        !inputAdress.value ||
        !inputMail.value ||
        !inputCheck.checked
      ) {} else {
  
        // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
        let productsBought = [];
        productsBought.push(teddyBasket);
  
        const order = {
          contact: {
            firstName: inputName.value,
            lastName: inputLastName.value,
            city: inputCity.value,
            address: inputAdress.value,
            email: inputMail.value,
          },
          products: productsBought,
        };
  
        // -------  Envoi de la requête POST au back-end --------
        // Création de l'entête de la requête
        const options = {
          method: "POST",
          body: JSON.stringify(order),
          headers: { "Content-Type": "application/json" },
        };
  
        // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
        fetch("http://localhost:3000/api/teddies/order", options)
          .then((response) => response.json())
          .then((json)=> {
            console.log(json)
            localStorage.clear();
            localStorage.setItem("amountSale", productTotal);
  
            //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
            document.location.href = "confirm.html";
          })
          .catch((err) => {
            alert("Votre panier est vide ! " + err);
          });
      }
    });
  }
  
  checkFormAndPostRequest()

