// // onLoadCartNumbers(); 


// let params = (new URL(document.location)).searchParams;

// //STOCK L ID 
// const id = params.get("id");

// fetch("http://localhost:3000/api/teddies/" + id)
//     .then(response => response.json())
//     .then(function (product) {
//         let teddy = new Teddy(product)
//         display(teddy);
//     })
//     //Gestion erreur
//     .catch(function (error) {
//         alert(error)
//     });


// //EMPLACEMENT HTML
// let container = document.getElementById("main");

// // FONCTION ENVOIE LOCAL STORAGE
// const addLocalStorage = panier => {
//   localStorage.setItem('panier', JSON.stringify(panier));
// };

// // INCLUS HTML
// const display = teddy => {
//   container.innerHTML +=`
//     <div class="appareil" id="cardsProduct">
//       <img src=${teddy.imageUrl} alt="">
//       <div class="description"> 
//         <p class="nom">${teddy.name}</p>
//         <span class="appareil-description">
//           ${teddy.description}
//         </span>
//         <select class="options" id ="option">
//           <option>Choix options</option>
//         </select>
//         <p class="prix"> Prix Unitaire: ${teddy.price/ 100}€</p>
//         <select class="quantite" id="quantity">           
//           <option value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//         </select>         
//         <a href ="../pages/panier.html"><button type ="submit" id="panier" value="submit"> Ajouter au panier</button></a>
//       </div>
//     </div>
//   `;}









//RECUPERATION DE L URL
let params = (new URL(document.location)).searchParams;

//STOCK L ID 
const id = params.get("id");

//EMPLACEMENT HTML
let container = document.getElementById("main");

// FONCTION ENVOIE LOCAL STORAGE
const addLocalStorage = basket => {
  localStorage.setItem('basket', JSON.stringify(basket));
};

// INCLUS HTML
const display = teddy => {
  container.innerHTML +=`  
  <div class="card mb-4 mb-lg-0 bg_Orinoco">
      <img src="${teddy.imageUrl}" alt="${teddy.name}" class="w-full lg:w-1/2 md:min-w-1/2 h-full p-3" id="card__img">
      <div class="card-body">
           <h2 class="card-title h3" id="card__title">${teddy.name}</h2>
           <p id="card__description">${teddy.description}</p>
           <div class="d-flex justify-content-around mt-4">
           <select class="options" id ="option">
           <option>Choix options</option>
         </select>
         <p class="prix"> Prix Unitaire: ${teddy.price/ 100}€</p>
         <select class="quantite" id="quantity">           
           <option value="1">1</option>
           <option value="2">2</option>
           <option value="3">3</option>
         </select>      
               <a href="#" class="btn btn-Orinoco btn-block" id="add-product" data-action="add_cart"></a>
           </div>
       </div>
  </div>

  `;

    
// // Construction DIV fiche produit teddy
// function ficheProductTeddy(productSelected) {
//     const teddyCard = document.getElementById("product")
//     //Récupère le template
//     const templateElt = document.getElementById("templateProduct")
//     //Clone le template
//     const cloneElt = document.importNode(templateElt.content, true)
//     //Créer les templates
//     cloneElt.getElementById("card__img").src = productSelected.imageUrl
//     cloneElt.getElementById("card__img").alt = `Image de ${productSelected.name}`
//     cloneElt.getElementById("card__price").textContent = `${productSelected.price / 100}.00 €`
//     cloneElt.getElementById("card__title").textContent = productSelected.name
//     cloneElt.getElementById("card__description").textContent = productSelected.description
//     cloneElt.getElementById("add-product").textContent = `Ajouter ${productSelected.name} au panier`
//     //Publie tout les templates en fonction des produits
//     document.getElementById("main").appendChild(cloneElt)
// }





  // CHOIX OPTIONS
  for (let colors of basket.colors){
    document.getElementById("option").innerHTML+=
    `<option value="1">${teddy.colors}</option>`
  }
  // ECOUTE EVENEMENT AU CLICK + FNCT addProductBasket
  document.getElementById("basket").addEventListener("click", function () {
    addProductBasket(teddy)
  });
};

//FONCTION AJOUTER PANIER 
const addProductBasket = teddy=> {
  teddy.quantity = parseInt(document.getElementById("quantity").value);

  //RECUPERE PANIER//memo : let variable=(condition)? "valeursi vrai": "valeur si faux"
  let panier = localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : [];

  //BOUCLE FOR PARCOUR LIGNE PANIER
  let teddyExist = false;
  for (let i = 0; i < basket.length; i++) {
    let product = panier[i];
    //CONDITION CI PRODUIT EXISTE
    if (product.id === camera.id) {
      teddyExist = i;
    }
  };
  // Caméra existe dans le panier
  if (false !== teddyExist) {
    basket[teddyExist].quantity = parseInt(basket[teddyExist].quantity) + teddy.quantity;
  } else {
    basket.push(teddy);
  };
  addLocalStorage(basket)
};

// APPELLE API AVEC FETCH
fetch("http://localhost:3000/api/teddies/" + id)
  .then(response => response.json())
  .then(function (product) {
    let teddy = new Teddy(product)
    display(teddy);
  })
  // SI PROBLEME API
  .catch(function(err){
  console.log("fetch Error")
});


















// // Choix des couleurs

// function colorProductOption(productSelected){
//     const productColors = productSelected.colors
//     const productColor = document.getElementById("productColor")
//     productColors.forEach( color => {
//         const colorOption = document.createElement("option")
//         colorOption.setAttribute("value",color)
//         colorOption.innerHTML = color
//         productColor.appendChild(colorOption)
//     })
// }


// // Ajout du produit dans le panier 

// function addTeddy(productSelected){
//     const addProductToLocalStorage = document.getElementById("add-product")
//     addProductToLocalStorage.addEventListener("click", function(event){
//         event.preventDefault()
//         teddyAdopted = {
//                         teddyName: productSelected.name, 
//                         teddyColor: productColor.value, 
//                         teddyId: productSelected._id, 
//                         teddyPrice: productSelected.price / 100,
//                         teddyImageUrl: productSelected.imageUrl,
//                         teddyQuantity: 1
//         }
//         addProduct()
//     })
// }

// function addProduct(){
//     teddySelected = JSON.parse(localStorage.getItem("addedTeddies"))
//     if (teddySelected) {
//         thenRedirect()
//     } else {
//         teddySelected = []
//         thenRedirect()
//     }    
// }



// function thenRedirect(){
//     teddySelected.push(teddyAdopted)
//     let basket = localStorage.setItem("addedTeddies", JSON.stringify(teddySelected))
//       //BOUCLE FOR PARCOUR LIGNE PANIER
//   let productExist = false;
//   for (let i = 0; i < basket; i++) {
//     let product = basket[i];
//     //CONDITION CI PRODUIT EXISTE
//     if (product.id === productSelected.id) {
//         productExist = i;
//     }
//   };
//   if (false !== productExist) {
//     basket[productExist].teddyQuantity = parseInt(basket[productExist].teddyQuantity) + productSelected.teddyQuantity;
//   } else {
//     basket.push(productSelected);
//   };
//   addLocalStorage(basket)
// };


