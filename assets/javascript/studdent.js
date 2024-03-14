const studentContainer = document.querySelector('#studentContainer')
const fromAddStudent = document.querySelector('#fromAddStudent')
const buttonHidden = document.querySelector('#buttonHidden')
let namechang = ""
let lastNameChang = ""
let newAge = ""

function getPromoId() {
    let url = window.location.href
    let objUrl = new URL(url)
    const id = objUrl.searchParams.get("id")
    return id
}

async function getStudentByPromo() {
    const response = await fetch("http://146.59.242.125:3004/promos/" + getPromoId(), {
        headers: {
            "Authorization": "Bearer bbd226c3-f867-474f-991a-8968f62a95bf"
        }
    })
    const data = await response.json()
    const students = data.students
    return students

}

async function displayStudents() {
    const students = await getStudentByPromo()
    studentContainer.innerHTML = ""

    students.forEach(student => {
        let studentDiv = document.createElement('div')
        studentContainer.appendChild(studentDiv)
        studentDiv.classList.add('container')
        let titreStudent = document.createElement('p')
        studentDiv.appendChild(titreStudent)
        titreStudent.classList.add('titreStudent')
        titreStudent.textContent = `${student.firstName}  ${student.lastName} /${student.age}ans`
        let divButton = document.createElement('div')
        studentDiv.appendChild(divButton)
        divButton.classList.add('divButton')
        let delet = document.createElement('button')
        divButton.appendChild(delet)
        delet.textContent = 'supprimer éleve'
        let modif = document.createElement('button')
        divButton.appendChild(modif)
        modif.textContent = 'modifier éleve'
        delet.addEventListener('click', () => {
            deleteStudent(student._id)
        })
        modif.addEventListener('click', () => {
           
            let changDiv = document.createElement('div')
            let changFirstName = document.createElement('input')
            let changLastName = document.createElement('input')
            let changAge = document.createElement('input')
            let validName = document.createElement('button')
            validName.textContent = "Valider nouveau nom"
            studentDiv.appendChild(changDiv)
            changDiv.appendChild(validName)
            changDiv.appendChild(changFirstName)
            changDiv.appendChild(changLastName)
            changDiv.appendChild(changAge)
            changFirstName.value = student.firstName
            changLastName.value = student.lastName
            changAge.value = student.age
            validName.addEventListener('click', () => {
                namechang =  changFirstName.value
                lastNameChang = changLastName.value
                newAge = changAge.value
                changStudent(student._id)
            })

        })

    });
}

async function deleteStudent(studentId) {
    const response = await fetch(`http://146.59.242.125:3004/promos/${getPromoId()}/students/${studentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer bbd226c3-f867-474f-991a-8968f62a95bf"

        }
    })
    const data = await response.json()
    displayStudents()
}

async function addStudent() {

    const body = {
        "firstName": document.querySelector('#firstName').value,
        "lastName": document.querySelector('#lastName').value,
        "age": document.querySelector('#age').value
    }
    const response = await fetch(`http://146.59.242.125:3004/promos/${getPromoId()}/students`, {
        method: "POST",
        headers: {
            "Authorization": "Bearer bbd226c3-f867-474f-991a-8968f62a95bf",
            "Content-type": "Application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    displayStudents()
}

async function changStudent(studentId) {

    const body = {
        "firstName": namechang,
        "lastName": lastNameChang,
        "age": newAge
    }
    const response = await fetch(`http://146.59.242.125:3004/promos/${getPromoId()}/students/${studentId}`, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer bbd226c3-f867-474f-991a-8968f62a95bf",
            "Content-type": "Application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    displayStudents()
}

function hiddenStudent(){

    studentContainer.classList.toggle("hidden")
    fromAddStudent.classList.toggle("hidden")
    if (fromAddStudent.classList == "hidden") {
        buttonHidden.textContent = "Ajouter un éléve"
    }else if (fromAddStudent.classList != "hidden") {
        buttonHidden.textContent = "retour"
    }
}
displayStudents()