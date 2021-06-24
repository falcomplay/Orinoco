// Création main fonction

main()

async function main() {
    const products = await getProducts()
    // création loop pour afficher chaque produit
    for (product of products){
        displayProduct(product)
      
    }
}

// Connection à l'api
function getProducts(){
    return fetch("http://localhost:3000/api/teddies")
       //Formatage au format JSON
        .then(function(httpBodyResponse){
            return httpBodyResponse.json()
        })
        //Récupération tableaux des produits
        .then(function(products){
            return products
        })
        //Gestion erreur
        .catch(function(error){
            alert(error)
        })
}

function displayProduct(product){
    //Récupère le template
    const templateElt = document.getElementById("templateProduct")
    //Clone le template
    const cloneElt = document.importNode(templateElt.content, true)
    //Créer les templates
    cloneElt.getElementById("card__img").src = product.imageUrl
    cloneElt.getElementById("card__img").alt = `Image de ${product.name}`
    cloneElt.getElementById("card__price").textContent = `${product.price / 100}.00 €`
    cloneElt.getElementById("card__title").textContent = product.name
    cloneElt.getElementById("card__link").href = `/product.html?id=${product._id}`
    //Publie tout les templates en fonction des produits
    document.getElementById("main").appendChild(cloneElt)


}