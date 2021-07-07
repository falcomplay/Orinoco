
const montantCommande = localStorage.getItem("amountSale");

const numberSale = `${montantCommande}cmdtosend`

const summarySale = document.getElementById("summarySale")
const recapDiv = document.createElement("div")
recapDiv.innerHTML = `
<div class="card mb-4 mb-lg-0 justify-content-center border-primary shadow">
<h3 class="card-header text-center h5">Merci de votre confiance !</h3>
<div class="card-body">
    <h4 class="h6">Nous vous confirmons votre achat.</h4>
    <p>Toute l'équipe d'Orinoco vous remercie.</p>
    <p>Vos achats arriveront très prochainement chez vous.</p>
</div>
<div class="alert alert-success rounded-0">
    <h4 class="h6" class="alert-heading">Récapitulatif de votre commande :</h4>
    <hr>
    <div class="row">
        <div class="col-sm-4 col-md-3">Numéro :</div>
        <div class="col user-select-all"><small>${numberSale}</small></div>
    </div>
    <div class="row">
        <div class="col-sm-4 col-md-3">Montant :</div>
        <div class="col"><small>${montantCommande}.00 €</small></div> 
    </div>
</div>
<div class="card-footer">
    <a href="index.html" class="btn btn-Orinoco btn-block">revenir à l'accueil</a>
</div>
</div>`
summarySale.appendChild(recapDiv)
//on vide le localstorage
localStorage.clear()