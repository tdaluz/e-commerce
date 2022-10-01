let varEmail = document.getElementById("email");
let varPass = document.getElementById("contraseña");
let btnLogin = document.getElementById("btnLog");
let user = "";
btnLogin.addEventListener("click", e =>{
if (varEmail.value.length > 0 && varPass.value.length > 0) {
    localStorage.setItem("user", varEmail.value);
    location.replace('init.html')}
   else{
        showAlertError();
    }
})
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}