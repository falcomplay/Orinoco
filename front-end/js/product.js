const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (id === null) { window.location.href = "index.html" }

fetch("http://localhost:3000/api/teddies/" + id)
    .then(productSelected => productSelected.json())
    .then(productSelected => {
        ficheProduitTeddy(productSelected)
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
