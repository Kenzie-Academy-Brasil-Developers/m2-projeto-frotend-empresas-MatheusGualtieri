export function showToast(){
    const toast = document.querySelector("#toast");
    toast.classList.add("show");
    setTimeout(()=>{
        toast.classList.remove("show");
        toast.classList.remove("toast-failure");
        toast.classList.remove("toast-succes");
    }, 3000)
}

export function toastFailure(){
    const toast = document.querySelector("#toast");
    const toastMessage = document.querySelector("#toast-message");
    toastMessage.innerHTML = "Erro na criação de usuário.";
    toast.classList.add("toast-failure");
}

export function toastSucces(){
    const toast = document.querySelector("#toast");
    const toastMessage = document.querySelector("#toast-message");
    toastMessage.innerHTML = "Criação de usuário bem sucedida";
    toast.classList.add("toast-succes");
}

export function toastFailureLogin(){
    const toast = document.querySelector("#toast");
    const toastMessage = document.querySelector("#toast-message");
    toastMessage.innerHTML = "Email ou senha incorretos.";
    toast.classList.add("toast-failure");
}

export function toastConfirmDeleteDepartament(departamentName){
    const toast = document.querySelector("#toast");
    toast.classList.add("show");
    toast.innerHTML = "";
    toast.insertAdjacentHTML("beforeend",`
    <div class="toast-confirm">
        <div class="toast-header">
            <p><strong>Realmente deseja deletar o Departamento ${departamentName} e demitir deus funcionários?</strong></p>
            <button class="button-close"><i class="fa-solid fa-xmark fa-2xl"></i></button>
        </div>
        <button type="button" class="button button-green" id="button-confirm">Confirmar</button>
    </div>
    `);
    const buttonCloseToast = document.querySelector("#toast .button-close");
    buttonCloseToast.addEventListener("click",()=>{
        toast.classList.remove("show");
    });
    const buttonConfirmToast = document.querySelector("#toast #button-confirm");
    buttonConfirmToast.addEventListener("click", async () =>{
        toast.classList.remove("show");
        });
}

export function toastConfirmDeleteUser(username){
    const toast = document.querySelector("#toast");
    toast.classList.add("show");
    toast.innerHTML = "";
    toast.insertAdjacentHTML("beforeend",`
    <div class="toast-confirm">
        <div class="toast-header">
            <p><strong>Realmente deseja remover o usuário ${username}?</strong></p>
            <button class="button-close"><i class="fa-solid fa-xmark fa-2xl"></i></button>
        </div>
        <button type="button" class="button button-green" id="button-confirm">Confirmar</button>
    </div>
    
    `);
    const buttonCloseToast = document.querySelector("#toast .button-close");
    buttonCloseToast.addEventListener("click",()=>{
        toast.classList.remove("show");
    });
    const buttonConfirmToast = document.querySelector("#toast #button-confirm");
    buttonConfirmToast.addEventListener("click", async () =>{
        toast.classList.remove("show");
        });
}