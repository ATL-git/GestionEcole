const promoContainer = document.querySelector('#promoContainer')

async function getPromos(){
    const response = await fetch ('http://146.59.242.125:3004/promos',{
        headers: {
            "Authorization" : "Bearer bbd226c3-f867-474f-991a-8968f62a95bf"
        }
    })
    const data = await response.json()
    return data
}

async function displayPromo(){
    const promos = await getPromos()
    console.log(promos);
    promoContainer.innerHTML = ""

    promos.forEach(promo => {
        let promoDiv = document.createElement('div')
        promoContainer.appendChild(promoDiv)
        promoDiv.classList.add('promo')
        let titrePromo =document.createElement('h2')
        promoDiv.appendChild(titrePromo)
        titrePromo.classList.add('titrePromo')
        titrePromo.textContent = promo.name
        let divButton = document.createElement('div')
        promoDiv.appendChild(divButton)
        divButton.classList.add('divButton')
        let delet = document.createElement('button')
        divButton.appendChild(delet)
        delet.textContent = 'supprimer promo'
        let modif = document.createElement('a')
        modif.href = "/assets/pages/student.html?id="+promo._id
        divButton.appendChild(modif)
        modif.textContent = 'modifier promo'
        delet.addEventListener('click',()=>{
            deletePromo(promo._id)
        })
        
    });
}

async function deletePromo(promoId){
    const response = await fetch("http://146.59.242.125:3004/promos/" + promoId, {
        method: "DELETE",
        headers: {
            "Authorization" : "Bearer bbd226c3-f867-474f-991a-8968f62a95bf"
            
        }
    })
    const data = await response.json()
    displayPromo()
}

async function addPromo(){
 
    const body = {
        "name" : document.querySelector('#name').value ,
        "startDate" :document.querySelector('#startDate').value,
        "endDate" :document.querySelector('#endDate').value
    }
const response = await fetch("http://146.59.242.125:3004/promos", {
    method: "POST",
    headers: {
        "Authorization" : "Bearer bbd226c3-f867-474f-991a-8968f62a95bf",
        "Content-type" : "Application/json"
    },
    body : JSON.stringify(body)
})
const data = await response.json()
displayPromo()
}



displayPromo()