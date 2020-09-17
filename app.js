const baseUrl= 'http://localhost:5000/';
const tacosContainer= document.getElementById("tacos-container");

const btnPostTaco= document.getElementById('btn-post-taco');

const btnUpdateTaco= document.getElementById('btn-update-taco');

const tacosOptions= document.getElementById('taco-option');

const tacoForm = {
    name: document.getElementById('taco-name'),
    quantity: document.getElementById('taco-quantity'),
    pica: document.getElementById ('option-pica')
}

const tacoUpdateForm = {
    name: document.getElementById('taco-name-update'),
    quantity: document.getElementById('taco-quantity-update'),
    pica: document.getElementById ('option-pica-update'),
    id: document.getElementById('tacoId')
    
}

btnPostTaco.onclick = () =>{
    const taco= {
        name: tacoForm.name.value,
        quantity: tacoForm.quantity.value,
        pica: tacoForm.pica.value
    }
    //console.log(taco);
    AddTaquito(taco);
};

btnUpdateTaco.onclick = () => {
    const taco = {
        name: tacoUpdateForm.name.value,
        quantity: tacoUpdateForm.quantity.value,
        pica: tacoUpdateForm.pica.value
        
    }
    console.log(taco);
    UpdateTaquito(tacosOptions.value,taco);
}

//console.log(tacoUpdateForm.id);




const GetTaquitos = ()=> {
    const url= baseUrl;
    fetch(url).then(data=> data.json())
    .then(tacos=>{
        tacosContainer.innerHTML= '';
        tacosOptions.innerHTML = '';
        tacos.forEach(taco => {
            const tacoElement =document.createElement('div');
            const tacoName = document.createElement('h3');
            const tacoQuantity = document.createElement('div');
            const tacoPica= document.createElement ('div');
            const btnDeleteTaco= document.createElement('button');
            btnDeleteTaco.innerHTML = "Eliminar X";
            btnDeleteTaco.id = "boton-borrar";

            const {name,quantity,pica,id}= taco;

            btnDeleteTaco.onclick = ()=>{
                DeleteTaquito(id);
            }
            
            const tacoOption =document.createElement('option');
            tacoOption.value = id;
            tacoOption.innerHTML = name;
            tacoOption.id = "tacoId";
            tacosOptions.appendChild(tacoOption);

            /*btnUpdateTaco.onclick = () =>{
                const taco = {
                    name: tacoUpdateForm.name.value,
                    quantity: tacoUpdateForm.quantity.value,
                    pica: tacoUpdateForm.pica.value
                    
                }
                console.log(taco);
                UpdateTaquito(id,taco);
            } */

            tacoQuantity.innerHTML = `cantidad: ${quantity}`;
            tacoPica.innerHTML = `Pica: ${pica}`;
            tacoName.innerHTML = name;
            tacoElement.appendChild(tacoName);
            tacoElement.appendChild(tacoQuantity);
            tacoElement.appendChild(tacoPica);
            tacoElement.appendChild(btnDeleteTaco);

            tacosContainer.appendChild(tacoElement);
            console.log(taco);
        });
        
    });
    
};

const GetTaquito = id => {
    const url= `${baseUrl}${id}`;
    fetch(url).then(data=> data.json()).then(taco=>{

    });
};

const AddTaquito = taco =>{
    const url = baseUrl;
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(taco), 
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data=>data.json())
    .then(taco => GetTaquitos());
};

const UpdateTaquito = (id, data) => {
    const url = `${baseUrl}${id}`;
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res=>res.json())
    .then(taco => GetTaquitos());
};

const DeleteTaquito = id => {
    const url = `${baseUrl}${id}`;
    fetch(url, {
        method: 'DELETE'
    }).then(_=> {
        GetTaquitos();
    })
};

GetTaquitos();
/*GetTaquito(2);

const showChanges = async ()=>{
    await AddTaquito({
        name: 'canasta',
        quantity: 3,
        pica: 'si'
    });
    
    GetTaquitos();
}

showChanges(); */

/* UpdateTaquito(1, {
    name: 'costillitas',
    quantity: 6,
    pica: 'no'
}); */

//DeleteTaquito(2);