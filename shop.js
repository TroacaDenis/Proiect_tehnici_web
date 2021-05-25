let stock=[];
let comenzi=[];

function add_product(x,y,z){
    let new_product={
        qty: x,
        info: y,
        pret: z
    }
    fetch('http://localhost:3000/products', {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_product)
    }).then(function(response) {
    })
}
//add_product(89,"Hrana umeda pentru pisici Whiskas Multipack Selectie de carne in sos, 12x100g",19);
//add_product(1,"Hrana umeda pentru pisici Royal Canin, Sterilised, in sos, 12x85g",51);
//add_product(120,"Hrana uscata pentru pisici Royal Canin, Sterilised 37, 2kg",73);
//add_product(40,"Hrana uscata pentru pisici Whiskas, Pui, 14Kg",134);
//add_product(69,"Hrana umeda pentru caini Pedigree Junior, 12x100g",18);
//add_product(37,"Hrana uscata pentru caini Pedigree Adult, Vita &amp; Pasare, 15 Kg",96);

function plus(i){
    let items=document.getElementsByClassName("shop-item");
    items[i].children[3].innerHTML=parseInt(items[i].children[3].innerHTML)+1;
}
function minus(i){
    let items=document.getElementsByClassName("shop-item");
    if(items[i].children[3].innerHTML==0)
        return
    items[i].children[3].innerHTML=parseInt(items[i].children[3].innerHTML)-1;
}

///adauga sau modifica un item din cos cu add_order sau modify_order
function adauga_in_cos(x){
    let items=document.getElementsByClassName("shop-item");
    if(stock[x]<items[x].children[3].innerHTML){
        alert("Eroare: doar " + stock[x] + " bucati ramase");
        items[x].children[3].innerHTML=0;
    }
    else{
        if(stock[x]==items[x].children[3].innerHTML){
            items[x].children[5].addEventListener("mouseover",function(){items[x].children[5].innerHTML="Indisponibil";});
            items[x].children[5].addEventListener("mouseout",function(){items[x].children[5].innerHTML="Adauga in cos";});
        }
        if(typeof comenzi[x]==='number'){
            comenzi[x]+=parseInt(items[x].children[3].innerHTML);
            modify_order(x);
        }
        else{
            comenzi[x]=parseInt(items[x].children[3].innerHTML); 
            add_order(x);
        }       
        stock[x]-=items[x].children[3].innerHTML;
        items[x].children[3].innerHTML=0;
    }
}
function add_order(x){
    let items=document.getElementsByClassName("shop-item");
    let new_order={
        qty: comenzi[x],
        info: items[x].children[0].innerHTML,
        pret: parseInt(items[x].children[1].innerHTML.substr(0,items[x].children[1].innerHTML.length-11))
    }
    fetch('http://localhost:3000/orders', {
        method: 'post', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_order)
    }).then(function(response) {
        ///modify_stock(x);
    })
}
function modify_order(x){
    let items=document.getElementsByClassName("shop-item");
    let new_order={
        qty: comenzi[x],
        info: items[x].children[0].innerHTML,
        pret: parseInt(items[x].children[1].innerHTML.substr(0,items[x].children[1].innerHTML.length-11))
    }
    let aux=x+1;
    fetch('http://localhost:3000/orders/'+aux, {
        method: 'put', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_order)
    }).then(function(response) {
        ///modify_stock(x);
    })
}
///modifica cantitatea din stock a unui item
function modify_stock(x){
    let items=document.getElementsByClassName("shop-item");
    let new_order={
        qty: stock[x]-items[x].children[3].innerHTML,
        info: items[x].children[0].innerHTML,
        pret: parseInt(items[x].children[1].innerHTML.substr(0,items[x].children[1].innerHTML.length-11))
    }
    let aux=x+1;
    fetch('http://localhost:3000/products/'+aux, {
        method: 'put', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new_order)
    }).then(function(response) {
        console.log(response);
    })
}

///verifica daca exista deja elemente in cos
function get_cos_existent(){
    fetch('http://localhost:3000/orders', {
    method: 'get'
    }).then(function(response) {
        response.json().then((data) => {
            let i;
            for(i=0;i<data.length;i++){
                let x=i;
                comenzi[data[x].id-1]=data[x].qty;
            }
        })
    })
}

///afiseaza item-urile ce pot fi cumparate
function create_orders(){
    fetch('http://localhost:3000/products', {
    method: 'get'
    }).then(function(response) {
        response.json().then((data) => {
            let i;
            for(i=0;i<data.length;i++){
                let x=i;
                stock.push(data[x].qty);
                let auxdiv=document.createElement("div");
                auxdiv.className="shop-item";

                let auxdescriere=document.createElement("p");
                auxdescriere.innerHTML=data[x].info;
                auxdescriere.className="descriere";
                auxdiv.appendChild(auxdescriere);

                let auxpret=document.createElement("p");
                auxpret.innerHTML=data[x].pret+ ' lei bucata';
                auxpret.className="pret";
                auxdiv.appendChild(auxpret);

                let auxminus=document.createElement("button");
                auxminus.innerHTML="-";
                auxminus.className="minus";
                auxminus.addEventListener("click",function(){minus(x)});
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
                if(stock[x]==0){
                    auxadauga.addEventListener("mouseover",function(){auxadauga.innerHTML="Indisponibil";});
                    auxadauga.addEventListener("mouseout",function(){auxadauga.innerHTML="Adauga in cos";});
                }
                else
                    auxadauga.addEventListener("click",function(){adauga_in_cos(x)});
                auxdiv.appendChild(auxadauga);

                document.getElementById("main").appendChild(auxdiv);
            }
            ///get_cos_existent();
        })
    })
}
create_orders();
