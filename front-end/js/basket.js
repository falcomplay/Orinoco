const teddyBasket = JSON.parse(localStorage.getItem("addedTeddies"))
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
        <img src="img/sadTeddy.jpg" class="img-fluid">
        <p>Votre panier est vide... </p>
        <a href="index.html" class="btn btn-primary btn-block stretched-link">revenir à l'accueil</a>
        </div>`
    divTeddyItemNone.innerHTML = teddyBasketNoneContent
    teddyBasketNone.appendChild(divTeddyItemNone)
}

function ConstrusctionDuPanier(){
    i = 0
    teddyTotalBasket = 0
    const teddyBasketItem = document.getElementById("teddiesBasketList")
    teddyBasket.forEach(teddyItem => {
        const divTeddyItem = document.createElement("div")
        divTeddyItem.classList.add("row", "p-0", "m-1", "bg-light", "justify-content-between", "align-items-center")
        //console.log(teddyItem[i])
        const teddyBasketItemContent = `            
                <div class="col-2 p-1 d-none d-sm-block"><img src="${teddyItem.teddyImageUrl.slice(-18)}" alt="${teddyItem.teddyName}" class="w-100 m-1"></div>
                <div class="col-5 col-md-4 p-1">1x ${teddyItem.teddyName}</div>
                <div class="col-4 col-md-3 p-1">${teddyItem.teddyColor}</div>
                <div class="col-2  p-1">${teddyItem.teddyPrice} €</div>
                <div class="col-1  p-1 RemoveBtn" id="${i}">
                    <button type="button" class="close text-danger" aria-label="Supprimer">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>`
        divTeddyItem.innerHTML = teddyBasketItemContent
        teddyBasketItem.appendChild(divTeddyItem)
        i++
        teddyTotalBasket= teddyTotalBasket + teddyItem.teddyPrice   
    })}