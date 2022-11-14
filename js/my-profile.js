let userID = localStorage.getItem("user");
let userEmail = document.getElementById("userEmail");
let userName = document.getElementById("userName");
let userSecondName = document.getElementById("userSecondName");
let userSecondLastname = document.getElementById("userSecondLastname");
let userLastname = document.getElementById("userLastname");
let userPhoneNumber = document.getElementById("userPhoneNumber");
let btnSaveProfile = document.getElementById("btnSaveProfile")
let userImageProfile = document.getElementById("profileImage")
let bannerImage = document.getElementById('bannerImg');
let idProfile = document.getElementById("idProfile")
let profileUser = {};
let arrayProfile = [];
let index = 0

userEmail.value = userID;
idProfile.innerHTML = userID;

// Se baja el array de perfiles del almacenamiento local. En caso de no existir, crea un arreglo. 
arrayProfile = JSON.parse(localStorage.getItem('arrayProfile'));
if (!arrayProfile) {
    arrayProfile = [];
}


// Busca en el arreglo según el mail, en caso de encontrarlo devuelve el índice. Si no lo encuentra, devuelve -1. 
// Muestra en los campos los valores del arreglo. En caso de no encontrar el mail, deja los campos vacios. 
index = arrayProfile.findIndex((item) => item.email === userID);
if (index >= 0) {
    userName.value = arrayProfile[index].name
    userLastname.value = arrayProfile[index].lastname
    userSecondName.value = arrayProfile[index].secondName
    userSecondLastname.value = arrayProfile[index].secondLastname
    userPhoneNumber.value = arrayProfile[index].phoneNumber
    userImageProfile = arrayProfile[index].phoneNumber
}



btnSaveProfile.addEventListener("click", () => {
    // si el índice es mayor o igual a 0 significa que lo encontró. Modifica los valores del elemento según los datos de los campos. 
    if (index >= 0) {
        arrayProfile[index].name = userName.value
        arrayProfile[index].lastname = userLastname.value
        arrayProfile[index].secondName = userSecondName.value
        arrayProfile[index].secondLastname = userSecondLastname.value
        arrayProfile[index].phoneNumber = userPhoneNumber.value

    }

    // Si no es mayor o igual a 0, significa que no lo encontró por lo que crea un nuevo elemento, lo guarda en el arreglo y el arreglo lo guarda en el almacenamiento local.
    else {
        profileUser = {
            email: userID,
            name: userName.value,
            secondName: userSecondName.value,
            lastname: userLastname.value,
            secondLastname: userSecondLastname.value,
            phoneNumber: userPhoneNumber.value,

        }
        arrayProfile.push(profileUser);
    }

    validData(userName)
    validData(userLastname)
    validData(userEmail)
    if (userName.classList.contains("is-valid") && userLastname.classList.contains("is-valid") && userEmail.classList.contains("is-valid")) {
        localStorage.setItem('arrayProfile', JSON.stringify(arrayProfile));
        showAlertSuccess()
    }
    else {
        showAlertDanger()
    }
})

// Valida que los campos no estén vacios. 
function validData(data) {
    if (data.value.length == 0) {
        data.classList.add("is-invalid")
    }
    else {
        data.classList.add("is-valid");
    }

    data.addEventListener("input", () => {
        data.classList.remove("is-valid")
        data.classList.remove("is-invalid")
        validData(data);
    });

}



function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertDanger() {
    document.getElementById("alert-danger").classList.add("show");
}

