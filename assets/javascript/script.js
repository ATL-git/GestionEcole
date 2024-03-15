const promoContainer = document.querySelector('#promoContainer')
const fromAddPromo = document.querySelector('#fromAddPromo')
const buttonHidden = document.querySelector('#buttonHidden')


let namePromoChang = ""
let startDateChang = ""
let endDateChang = ""

async function getPromos() {
    const response = await fetch('http://146.59.242.125:3004/promos', {
        headers: {
            "Authorization": "Bearer bbd226c3-f867-474f-991a-8968f62a95bf"
        }
    })
    const data = await response.json()
    return data
}

async function displayPromo() {
    const promos = await getPromos()
    console.log(promos);
    promoContainer.innerHTML = ""

    promos.forEach(promo => {

        let promoDiv = document.createElement('div')
        promoContainer.appendChild(promoDiv)
        promoDiv.classList.add('promo')
        let titrePromo = document.createElement('h2')
        promoDiv.appendChild(titrePromo)
        titrePromo.classList.add('titrePromo')
        titrePromo.textContent = promo.name
        let startDatePromo = document.createElement('p')
        promoDiv.appendChild(startDatePromo)
        if (promo.startDate != null) {
            startDatePromo.classList.add('startDatePromo')

            startPromo = new Date(promo.startDate).toLocaleDateString("fr-FR")

            startDatePromo.textContent = `Debut de session : ${startPromo}`
        }
        let endDatePromo = document.createElement('p')
        promoDiv.appendChild(endDatePromo)
        if (promo.endDate != null) {
            endDatePromo.classList.add('endDatePromo')

            endPromo = new Date(promo.endDate).toLocaleDateString("fr-FR")

            endDatePromo.textContent = `Fin de session : ${endPromo}`
        }
        let divButton = document.createElement('div')
        promoDiv.appendChild(divButton)
        divButton.classList.add('divButton')
        let delet = document.createElement('button')
        divButton.appendChild(delet)
        delet.textContent = 'supprimer promo'
        let detail = document.createElement('a')
        detail.href = "/assets/pages/student.html?id=" + promo._id
        divButton.appendChild(detail)
        detail.textContent = 'details promo'
        let modif = document.createElement('button')
        divButton.appendChild(modif)
        modif.textContent = 'modifier la promo'
        modif.addEventListener('click', () => {

            let changDiv = document.createElement('div')
            changDiv.classList.add("changPromo")
            promoDiv.appendChild(changDiv)

            let changPromoName = document.createElement('input')
            changDiv.appendChild(changPromoName)
            changPromoName.value = promo.name
            let labelStartDate = document.createElement('label')
            labelStartDate.for = "modifDate"
            labelStartDate.textContent = "nouvelle date d'entrée :"
            let changStartDate = document.createElement('input')
            changStartDate.type = "date"
            changStartDate.id = "modifDate"
            changDiv.appendChild(labelStartDate)
            changDiv.appendChild(changStartDate)

            let changEndDate = document.createElement('input')
            changEndDate.type = "date"
            let labelEndDate = document.createElement('label')
            labelEndDate.for = "modifDate"
            labelEndDate.textContent = "nouvelle date de fin :"
            changDiv.appendChild(labelEndDate)
            changDiv.appendChild(changEndDate)
            let divButton = document.createElement('div')
            divButton.classList.add("divButton")
            promoDiv.appendChild(divButton)
            let retourner = document.createElement('button')
            retourner.textContent = "annuler"
            divButton.appendChild(retourner)
            let validName = document.createElement('button')
            validName.textContent = "Valider changement"
            divButton.appendChild(validName)
            retourner.addEventListener('click', () => {
                displayPromo()
            })

            validName.addEventListener('click', () => {
                namePromoChang = changPromoName.value
                startDateChang = changStartDate.value
                endDateChang = changEndDate.value
                changPromo(promo._id)
            })

        })
        delet.addEventListener('click', () => {
            deletePromo(promo._id)
        })

    });
}

async function deletePromo(promoId) {
    const response = await fetch("http://146.59.242.125:3004/promos/" + promoId, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer bbd226c3-f867-474f-991a-8968f62a95bf"

        }
    })
    const data = await response.json()
    displayPromo()
}

async function addPromo() {

    const body = {
        "name": document.querySelector('#name').value,
        "startDate": document.querySelector('#startDate').value,
        "endDate": document.querySelector('#endDate').value
    }
    const response = await fetch("http://146.59.242.125:3004/promos", {
        method: "POST",
        headers: {
            "Authorization": "Bearer bbd226c3-f867-474f-991a-8968f62a95bf",
            "Content-type": "Application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    hiddenPromo()
    displayPromo()
}

async function changPromo(promoId) {

    const body = {
        "name": namePromoChang,
        "startDate": startDateChang,
        "endDate": endDateChang
    }
    const response = await fetch("http://146.59.242.125:3004/promos/" + promoId, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer bbd226c3-f867-474f-991a-8968f62a95bf",
            "Content-type": "Application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    displayPromo()
}

function hiddenPromo() {

    promoContainer.classList.toggle("hidden")
    fromAddPromo.classList.toggle("hidden")
    if (fromAddPromo.classList == "hidden") {
        buttonHidden.textContent = "Ajouter une Promo"
    } else if (fromAddPromo.classList != "hidden") {
        buttonHidden.textContent = "retour"
    }
}

displayPromo()