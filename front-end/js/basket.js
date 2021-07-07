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
        })     
    }
}


function checkFormAndPostRequest() {

    // On récupère les inputs depuis le DOM.
    let submit = document.getElementById("sendForm");
    let inputName = document.getElementById("firstName")
    let inputLastName = document.getElementById("lastName")
    let inputAdress = document.getElementById("inputAddress")
    let inputPostal = document.getElementById("inputZip")
    let inputMail = document.getElementById("inputEmail4")
    let inputCity = document.getElementById("inputCity")
  
    // Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur, on empêche l'envoi du formulaire. On vérifie aussi que le numéro est un nombre, sinon même chose.
    submit.addEventListener("click", (e) => {
      if (
        !inputName.value ||
        !inputLastName.value ||
        !inputPostal.value ||
        !inputCity.value ||
        !inputAdress.value ||
        !inputMail.value
      ) {
        erreur.innerHTML = "Vous devez renseigner tous les champs !";
        e.preventDefault();
      } else {
  
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
          .then((data) => {
            localStorage.clear();
            localStorage.setItem("amountSale", productTotal);
  
            //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
            document.location.href = "confirm.html";
          })
          .catch((err) => {
            alert("Il y a eu une erreur : " + err);
          });
      }
    });
  }
  

  checkFormAndPostRequest()

//     const firstname = document.getElementById("firstName").value
//     const lastname = document.getElementById("lastName").value
//     const adress = document.getElementById("inputAddress").value
//     const zipcode = document.getElementById("inputZip").value
//     const email = document.getElementById("inputEmail4").value
//     const city = document.getElementById("inputCity").value
    
// document.getElementById("sendForm").addEventListener("click",function(){
//     {

//       // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
//       let productsBought = [];
//       productsBought.push(teddyBasket);

//           const order = {
//             contact: {
//                 firstName: firstname,
//                 lastName: lastname,
//                 address: adress + " " + zipcode,
//                 city: city,
//                 email: email,
//             },
//             products: productsBought,
//             };


//       // -------  Envoi de la requête POST au back-end --------
//       // Création de l'entête de la requête
//       const options = {
//         method: "POST",
//         body: JSON.stringify(order),
//         headers: { "Content-Type": "application/json" },
//       };

//       // Préparation du prix formaté pour l'afficher sur la prochaine page
//       let priceConfirmation = document.getElementById("total").innerText;
//       priceConfirmation = priceConfirmation.split(" :");

//       // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
//       fetch("http://localhost:3000/api/teddies/order", options)
//         .then((response) => response.json())
//         .then((data) => {
//           localStorage.clear();
//           localStorage.setItem("orderId", data.orderId);
//           localStorage.setItem("total", priceConfirmation[1]);

//           //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
//           document.location.href = "confirmation.html";
//         })
//         .catch((err) => {
//           alert("Il y a eu une erreur : " + err);
//         });
//     }
//   });




// // function sendOrder() {
// //     let form = document.getElementById("form");
// //     if (form.reportValidity() == true && teddyBasket.length>0) {
// //     const firstname = document.getElementById("firstName").value
// //     const lastname = document.getElementById("lastName").value
// //     const adress = document.getElementById("inputAddress").value
// //     const zipcode = document.getElementById("inputZip").value
// //     const email = document.getElementById("inputEmail4").value
// //     const city = document.getElementById("inputCity").value
    
// //     const order = {
// //       contact: {
// //         firstName: firstname,
// //         lastName: lastname,
// //         address: adress + " " + zipcode,
// //         city: city,
// //         email: email,
// //       }
// //     }

  
// //     const requestOptions = {
// //       method: 'POST',
// //       body: JSON.stringify(order),
// //       headers: { 'Content-Type': 'application/json; charset=utf-8' },
// //     }
  
// //     fetch(`http://localhost:3000/api/teddies/order`, requestOptions)
// //       .then((response) => response.json())
// //       .then((json) => {
// //         console.log(json)
// //         localStorage.removeItem("basket")
// //       })
// //       .catch(() => {
// //         alert(error)
// //       })
// //   }
// // }

// // // Utilisation de l'API validation 

// // document.getElementById("sendForm").addEventListener("click",function(){
// //     var valid = true;
// //     for(let input of document.querySelectorAll(".form-validate")){
// //         valid &= input.checkValidity();
// //         if(!valid){
// //             break;
// //         }
// //     }
// //     if(valid){
// //         localStorage.setItem("amountSale", montantCommande);
// //         sendOrder()
        
// //     }
// // })

