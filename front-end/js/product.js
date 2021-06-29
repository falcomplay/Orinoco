
onLoadCartNumbers(); 


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (id === null) { window.location.href = "index.html" }

fetch("http://localhost:3000/api/teddies/" + id)
    .then(productSelected => productSelected.json())
    .then(productSelected => {
        ficheProduitTeddy(productSelected)
        addTeddy(productSelected)
    })

// Construction DIV fiche produit teddy
function ficheProduitTeddy(productSelected) {
    const teddyCard = document.getElementById("product")
    //Récupère le template
    const templateElt = document.getElementById("templateProduct")
    //Clone le template
    const cloneElt = document.importNode(templateElt.content, true)
    //Créer les templates
    cloneElt.getElementById("card__img").src = productSelected.imageUrl
    cloneElt.getElementById("card__img").alt = `Image de ${productSelected.name}`
    cloneElt.getElementById("card__price").textContent = `${productSelected.price / 100}.00 €`
    cloneElt.getElementById("card__title").textContent = productSelected.name
    //Publie tout les templates en fonction des produits
    document.getElementById("main").appendChild(cloneElt)
}

// Ajout du produit dans le panier 

function addTeddy(productSelected){
    const addProductToLocalStorage = document.getElementById("add-product")
    addProductToLocalStorage.addEventListener("click", function(event){
        event.preventDefault()
        teddyAdopted = {
            teddyName: productSelected.name, 
                        teddyColor: productSelected.value, 
                        teddyId: productSelected._id, 
                        teddyPrice: productSelected.price / 100,
                        teddyImageUrl: productSelected.imageUrl
        }
        addProduct()
    })
}

function addProduct(){
    teddySelected = JSON.parse(localStorage.getItem("addedTeddies"))
    if (teddySelected) {
        thenRedirect()
    } else {
        teddySelected = []
        thenRedirect()
    }    
}

function thenRedirect(){
    teddySelected.push(teddyAdopted)
    localStorage.setItem("addedTeddies", JSON.stringify(teddySelected))
}

