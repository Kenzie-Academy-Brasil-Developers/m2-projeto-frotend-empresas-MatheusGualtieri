import { login, checkUserAuthorization, dataLocalStorageToken } from "./requests.js";
import { toggleMenu } from "./toggleMenu.js";

toggleMenu();
async function performLogin(){
    const allInputs = document.querySelectorAll("form input");
    let email = "";
    let password = "";
    allInputs.forEach(input => {
        switch(input.id){
            case "email":
                email = input.value;
            case "password":
                password = input.value;
                break;
            default:
                break;
        }
    })
    const userLoged = await login(email,password);
    const token = await dataLocalStorageToken();
    console.log(token.token)
    const userAuth = await checkUserAuthorization(token.token);
   setTimeout(()=>{
   if(userLoged){
    if(userAuth.is_admin){
        window.location.href = "../pages/admin.html"
    }else if(userAuth.is_admin == false){
        window.location.href = "../pages/user.html"
    }
   }}, 2000)
}

const buttonLogin = document.querySelector("#button-login");
buttonLogin.addEventListener("click", ()=>{
    performLogin();
});