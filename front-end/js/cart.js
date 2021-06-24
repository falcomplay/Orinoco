//Bind the event to the parent table say it has an id of parentTable
this.oTable= document.getElementById("main");    
this.oTable.addEventListener("click", function(event){
   //check the button was clicked
   if(event.target.dataset.action === "add_cart")
   {
    cartNumbers();
   }
});

// Garde le nombre de produit dans le panier au refresh de la page
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem("cartNumbers");
    if(productNumbers){
        document.querySelector(".cart span").textContent = productNumbers;
    }
}

// Incrémente le nombre d'article
function cartNumbers(){
    let productNumbers = localStorage.getItem("cartNumbers");

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".cart span").textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".cart span").textContent = 1;
    }
}

onLoadCartNumbers()