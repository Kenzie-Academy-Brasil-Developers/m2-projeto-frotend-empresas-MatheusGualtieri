import { createUser } from "./requests.js";
import { toggleMenu } from "./toggleMenu.js";

toggleMenu();
async function registerUser(){
    const allInputs = document.querySelectorAll("form input");
    let name = "";
    let password = "";
    let email = "";
    const professionalLevel = document.querySelector("#professional-level").value;
    allInputs.forEach(input => {
        switch(input.id){
            case "name":
                name = input.value;
                break;
            case "email":
                email = input.value;
            case "password":
                password = input.value;
                break;
            default:
                break;
        }
    })
   const userCreated = await createUser(name,password,email,professionalLevel);
   setTimeout(()=>{
   if(userCreated){
    window.location.href = "../pages/login.html"
   }}, 2000)
    
}

const buttonSignup = document.querySelector("#button-signup");
buttonSignup.addEventListener("click",()=>{
  
    registerUser();

});

