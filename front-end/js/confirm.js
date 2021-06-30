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
        alert("Votre commande a bien été prise en compte !")
        localStorage.clear();
        window.location.href ="index.html"
    }
})