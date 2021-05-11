

function plus(i){
    let items=document.getElementsByClassName("shop-item");
    items[i].children[3].innerHTML=parseInt(items[i].children[3].innerHTML)+1;
}
function minus(i){
    if(items[i].children[3].innerHTML==0)
        return
    items[i].children[3].innerHTML=parseInt(items[i].children[3].innerHTML)-1;
}
function adauga_in_cos(x){
    if(qty[x]<items[x].children[3].innerHTML){
        alert("Eroare: doar " + qty[x] + " bucati ramase");
        items[x].children[3].innerHTML=0;
    }
    else{
        if(qty[x]==items[x].children[3].innerHTML){
            items[x].children[5].removeEventListener("click",function(){adauga_in_cos(x)});
            items[x].children[5].addEventListener("mouseover",function(){items[x].children[5].innerHTML="Indisponibil";});
            items[x].children[5].addEventListener("mouseout",function(){items[x].children[5].innerHTML="Adauga in cos";});
        }
        orders.push({nume:items[x].children[0].innerHTML, pret:items[x].children[1].innerHTML,cantitate:items[x].children[3].innerHTML,});
        qty[x]-=items[x].children[3].innerHTML;
        items[x].children[3].innerHTML=0;
    }
}
function create_cos(){
    let j;
    for(j=0;j<orders.length;j++){
        let aux=document.createElement("div");
        aux.className="cos-item";
        aux.innerHTML='abcdsadwa';
        document.getElementById("main_cos").appendChild(aux);
    }
}




var xhttp = new XMLHttpRequest();
xhttp.open("GET", "http://localhost:3000/products", true);
xhttp.onload=function(){
    var info=JSON.parse(xhttp.responseText);
    let i;
    for(i=0;i<info.length;i++){
        let x=i;
        let auxdiv=document.createElement("div");
        auxdiv.className="shop-item";

        let auxdescriere=document.createElement("p");
        auxdescriere.innerHTML=info[i].info;
        auxdescriere.className="descriere";
        auxdiv.appendChild(auxdescriere);

        let auxpret=document.createElement("p");
        auxpret.innerHTML=info[i].pret;
        auxpret.className="pret";
        auxdiv.appendChild(auxpret);

        let auxminus=document.createElement("button");
        auxminus.innerHTML="-";
        auxminus.className="minus";
        auxdiv.appendChild(auxminus);

        let auxnumar=document.createElement("p");
        auxnumar.innerHTML=0;
        auxnumar.className="numar";
        auxdiv.appendChild(auxnumar);

        let auxplus=document.createElement("button");
        auxplus.innerHTML="+";
        auxplus.className="plus";
        auxplus.addEventListener("click",function(){plus(x)});
        auxdiv.appendChild(auxplus);

        let auxadauga=document.createElement("button");
        auxadauga.innerHTML="adauga";
        auxadauga.className="adauga";
        auxdiv.appendChild(auxadauga);

        document.getElementById("main").appendChild(auxdiv);
    }
};
xhttp.send(); 