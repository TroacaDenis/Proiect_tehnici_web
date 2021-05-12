let ids=[];
function create_cart(){
    fetch('http://localhost:3000/orders', {
    method: 'get'
    }).then(function(response) {
        response.json().then((data) => {
            let i;
            for(i=0;i<data.length;i++){
                let x=i;
                ids.push(data[x].id);
                let p=document.getElementById("pret-total");
                p.innerHTML='Pret total: '+(parseInt(p.innerHTML.substr(12,p.innerHTML.length))+data[x].pret*data[x].qty);
                let auxdiv=document.createElement("div");
                auxdiv.className="shop-item";

                let auxqty=document.createElement("p");
                auxqty.innerHTML=data[x].qty+'x';
                auxqty.className="cantitate";
                auxdiv.appendChild(auxqty);

                let auxdescriere=document.createElement("p");
                auxdescriere.innerHTML=data[x].info;
                auxdescriere.className="descriere";
                auxdiv.appendChild(auxdescriere);

                let auxpret=document.createElement("p");
                auxpret.innerHTML=data[x].pret*data[x].qty +' lei';
                auxpret.className="pret";
                auxdiv.appendChild(auxpret);

                document.getElementById("main_cos").appendChild(auxdiv);
            }
        })
    })
}
create_cart();

function delete_cart(){
    let items=document.getElementsByClassName("shop-item");
    let i;
    for(i=0;i<ids.length;i++){
        let x=i;
        fetch('http://localhost:3000/orders/' + ids[x], {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            window.location.reload(); 
        })
    }
}