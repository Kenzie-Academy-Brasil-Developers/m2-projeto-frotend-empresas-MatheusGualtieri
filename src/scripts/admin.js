import { createDepartamentInCompany, getAllCompanies,
    getDepartamentsByCompanyId, getAllEmployees,
    hireEmployee, dismissEmployee, updateDepartament,
    deleteDepartament, getAllDepartaments, updateUser,
    deleteUser } from "./requests.js";
import { toastConfirmDeleteDepartament, toastConfirmDeleteUser } from "./toast.js";
import { toggleMenu } from "./toggleMenu.js";

toggleMenu();

const buttonLogout = document.querySelector("#button-logout");
buttonLogout.addEventListener("click",()=>{
    localStorage.clear();
})

async function putCompaniesOnInputSelect(){
    const inputSelect = document.querySelectorAll(".enterprise");
    const allCompanies = await getAllCompanies();

    inputSelect.forEach(input => {
        allCompanies.forEach(enterprise => {
            const option = document.createElement("option");
            option.value = enterprise.uuid;
            option.text = enterprise.name;
            input.add(option);
        });
    })
    
}
putCompaniesOnInputSelect()

const buttonOpenCreateDepartamentModal = document.querySelector("#button-open-create-departament-modal");
buttonOpenCreateDepartamentModal.addEventListener("click", ()=>{
    const containerModalCreateDepartament = document.querySelector(".container-modal-create-departament");
    containerModalCreateDepartament.classList.remove("hidden")
})

const buttonCloseCreateDepartament = document.querySelector(".container-modal-create-departament .button-close");
buttonCloseCreateDepartament.addEventListener("click", ()=>{
    const containerModalCreateDepartament = document.querySelector(".container-modal-create-departament");
    containerModalCreateDepartament.classList.add("hidden")
})

async function registerDepartamentInCompay(){
    const allInputsOnCreateDepartament = document.querySelectorAll("#create-departament input");
    const inputSelectEnterprise = document.querySelector("#enterprise-create-departament").value;
    let departamentName = "";
    let departamentDescription = "";

    allInputsOnCreateDepartament.forEach(input =>{
        switch(input.id){
            case "departament-name":
                departamentName = input.value;
                break;
            case "departament-description":
                departamentDescription = input.value;
            default:
                break;
        }
    });
    await createDepartamentInCompany(departamentName,departamentDescription,inputSelectEnterprise);
}

const buttonCreateDepartament = document.querySelector("#button-create-departament");
buttonCreateDepartament.addEventListener("click", ()=>{
    registerDepartamentInCompay()
})

async function renderAllDepartaments(){
    const companyDepartaments = await getAllDepartaments();
    const departamentLisHTML = document.querySelector(".all-departaments");

    companyDepartaments.forEach(departament => {
        departamentLisHTML.insertAdjacentHTML("beforeend",`
            <li class="departament">
                <div class="departament-info">
                    <p><strong>${departament.name}</strong></p>
                    <p>${departament.description}</p>
                    <p>${departament.companies.name}</p>
                </div>
                <div class="container-buttons">
                    <button type="button" class="not-a-button" id="button-view-${departament.uuid}"><i class="fa-regular fa-eye fa-2xl"></i></button>
                    <button type="button" class="not-a-button" id="button-edit-${departament.uuid}"><i class="fa-solid fa-pen fa-2xl"></i></i></button>
                    <button type="button" class="not-a-button" id="button-delete-${departament.uuid}"><i class="fa-regular fa-trash-can fa-2xl"></i></i></button>
                </div>
                        </li>
        `);
        const allButtonsContainerButtons = document.querySelectorAll(".not-a-button");
        const allButtonsContainerButtonsArr = Array.prototype.slice.call(allButtonsContainerButtons);
        
        allButtonsContainerButtonsArr.forEach(button => {
            switch(button.id){
                case `button-view-${departament.uuid}`:
                    button.addEventListener("click", ()=>{
                        const containerModalDepartament = document.querySelector(".container-modal-departament");
                        containerModalDepartament.classList.remove("hidden");
                        renderViewDepartament(departament);
                    })
                    
                    break;
                case `button-edit-${departament.uuid}`:
                    button.addEventListener("click", ()=>{
                        const containerModalEditDepartament = document.querySelector(".container-modal-edit-departament");
                        containerModalEditDepartament.classList.remove("hidden");
                        const buttonSaveEdit = document.querySelector(".container-modal-edit-departament #button-save");
                        buttonSaveEdit.addEventListener("click", async ()=>{
                            const newDepartamentDescription = document.querySelector("#newDescription").value;
                            await updateDepartament(newDepartamentDescription, departament.uuid);
                        });
                        const buttonCloseEdit = document.querySelector(".container-modal-edit-departament .button-close");
                        buttonCloseEdit.addEventListener("click", ()=>{
                            containerModalEditDepartament.classList.add("hidden")
                        })
                    })
                    break;
                case `button-delete-${departament.uuid}`:
                    button.addEventListener("click", async () =>{
                        toastConfirmDeleteDepartament(departament.name);
                        const buttonConfirmToast = document.querySelector("#toast #button-confirm");
                        buttonConfirmToast.addEventListener("click", async () =>{
                            await deleteDepartament(departament.uuid);
                            renderDepartamentsByCompanyId(id);
                        });
                    })
                    break;
                default:
                    break;
            }
        })
    })
}
renderAllDepartaments();

async function renderDepartamentsByCompanyId(id){
    const companyDepartaments = await getDepartamentsByCompanyId(id);
    const departamentLisHTML = document.querySelector(".all-departaments");

    departamentLisHTML.innerHTML = "";

    companyDepartaments.forEach(departament => {
        departamentLisHTML.insertAdjacentHTML("beforeend",`
            <li class="departament">
                <div class="departament-info">
                    <p><strong>${departament.name}</strong></p>
                    <p>${departament.description}</p>
                    <p>${departament.companies.name}</p>
                </div>
                <div class="container-buttons">
                    <button type="button" class="not-a-button" id="button-view-${departament.uuid}"><i class="fa-regular fa-eye fa-2xl"></i></button>
                    <button type="button" class="not-a-button" id="button-edit-${departament.uuid}"><i class="fa-solid fa-pen fa-2xl"></i></i></button>
                    <button type="button" class="not-a-button" id="button-delete-${departament.uuid}"><i class="fa-regular fa-trash-can fa-2xl"></i></i></button>
                </div>
                        </li>
        `);
        const allButtonsContainerButtons = document.querySelectorAll(".not-a-button");
        const allButtonsContainerButtonsArr = Array.prototype.slice.call(allButtonsContainerButtons);
        
        allButtonsContainerButtonsArr.forEach(button => {
            switch(button.id){
                case `button-view-${departament.uuid}`:
                    button.addEventListener("click", ()=>{
                        const containerModalDepartament = document.querySelector(".container-modal-departament");
                        containerModalDepartament.classList.remove("hidden");
                        renderViewDepartament(departament);
                    })
                    
                    break;
                case `button-edit-${departament.uuid}`:
                    button.addEventListener("click", ()=>{
                        const containerModalEditDepartament = document.querySelector(".container-modal-edit-departament");
                        containerModalEditDepartament.classList.remove("hidden");
                        const buttonSaveEdit = document.querySelector(".container-modal-edit-departament #button-save");
                        buttonSaveEdit.addEventListener("click", async ()=>{
                            const newDepartamentDescription = document.querySelector("#newDescription").value;
                            await updateDepartament(newDepartamentDescription, departament.uuid);
                        });
                        const buttonCloseEdit = document.querySelector(".container-modal-edit-departament .button-close");
                        buttonCloseEdit.addEventListener("click", ()=>{
                            containerModalEditDepartament.classList.add("hidden")
                        })
                    })
                    break;
                case `button-delete-${departament.uuid}`:
                    button.addEventListener("click", async () =>{
                        toastConfirmDeleteDepartament(departament.name);
                        const buttonConfirmToast = document.querySelector("#toast #button-confirm");
                        buttonConfirmToast.addEventListener("click", async () =>{
                            await deleteDepartament(departament.uuid);
                            renderDepartamentsByCompanyId(id);
                        });
                    })
                    break;
                default:
                    break;
            }
        })
    })
}

const inputSelectAdminActions = document.querySelector("#enterprise-admin-actions");
inputSelectAdminActions.addEventListener("click", ()=>{
    const id = inputSelectAdminActions.value;
    renderDepartamentsByCompanyId(id);
})

function renderViewDepartament(departament){
    const containerModalDepartament = document.querySelector(".container-modal-departament");
    containerModalDepartament.innerHTML = "";
    containerModalDepartament.insertAdjacentHTML("beforeend",`
    <div class="modal">
                <div class="header-modal">
                    <h1>${departament.name}</h1>
                    <button class="button-close"><i class="fa-solid fa-xmark fa-2xl"></i></button>
                </div>
                <form class="container-form" >
                    <div class="departament-info">
                         <p><strong>${departament.description}</strong></p>
                        <p>${departament.companies.name}</p>
                    </div>
                    <div class="container-inputs">
                        <select name="user" id="user" class="input-select input-select-second">
                            <option value="none">Selecionar usuário</option>
                        </select>
                        <button type="button" class="button button-green" id="button-hire-${departament.uuid}">Contratar</button>
                    </div>
                </form>
                <div class="container-list-modal">
                    <ul class="container-users-modal">
                        
                    </ul>
                </div>
        </div>
    `);
    const buttonClose = document.querySelector(".container-modal-departament .button-close");
    buttonClose.addEventListener("click", ()=>{
        containerModalDepartament.classList.add("hidden")
    });
    const buttonHire = document.querySelector(`#button-hire-${departament.uuid}`);
    buttonHire.addEventListener("click", async ()=>{
        const userUnemployeedId = document.querySelector("#user").value;
        await hireEmployee(userUnemployeedId,departament.uuid);
        await renderEmployeesOnDepartament(departament);
        await putUsersUnemployeedOnInputSelect();
        await renderAllUsers();
    })
    renderEmployeesOnDepartament(departament);
    putUsersUnemployeedOnInputSelect();
}

async function renderEmployeesOnDepartament(departament){
    const allEmployees = await getAllEmployees();
    const allEmployeesOnDepartament = allEmployees.filter(employee => {return employee.department_uuid == departament.uuid  });
    const containerUsersList = document.querySelector(".container-users-modal");

    containerUsersList.innerHTML= "";
    allEmployeesOnDepartament.forEach(employee => {
        containerUsersList.insertAdjacentHTML("beforeend", `
            <li class="user-modal">
                <p><strong>${employee.username}</strong></p>
                <p>${employee.professional_level}</p>
                <p>${departament.companies.name}</p>
                <button type="button" class="button button-red" id="button-remove-user-${employee.uuid}">Desligar</button>
            </li>
        `)
        const buttonRemoveUser = document.querySelector(`#button-remove-user-${employee.uuid}`);
        buttonRemoveUser.addEventListener("click", async ()=>{
            await dismissEmployee(employee.uuid);
            await renderEmployeesOnDepartament(departament);
            await putUsersUnemployeedOnInputSelect();
        })
    })
}

async function putUsersUnemployeedOnInputSelect(){
    const allEmployees = await getAllEmployees();
    const allUsersUnemployeed = allEmployees.filter(employee => {return employee.department_uuid == null && !employee.is_admin });
    const inputSelecUsersUnermployeed = document.querySelector("#user");
    inputSelecUsersUnermployeed.innerHTML = "";
    const optionFirst = document.createElement("option");
    optionFirst.value = "";
    optionFirst.text = "Selecionar Usuário";
    inputSelecUsersUnermployeed.add(optionFirst);
    allUsersUnemployeed.forEach(user => {
        const option = document.createElement("option");
        option.value = user.uuid;
        option.text = user.username;
        inputSelecUsersUnermployeed.add(option);
    });
}

async function renderAllUsers(){
    const allUsers = await getAllEmployees();
    const allUsersList = document.querySelector(".all-users");
    const allDepartaments = await getAllDepartaments();

    allUsersList.innerHTML = "";

    allUsers.forEach(user =>{
        let userDepartament = allDepartaments.find(departament => departament.uuid == user.department_uuid );
        if(!userDepartament){
            userDepartament = {
                name: " ",
                companies:{
                    name: " "
                }
            }
        }
        if(user.is_admin == true){

        }else{
            allUsersList.insertAdjacentHTML("beforeend",`
                <li class="user">
                    <div class="user-info">
                        <p><strong>${user.username}</strong></p>
                        <p>${user.professional_level}</p>
                        <p>${userDepartament.companies.name}</p>
                    </div>
                    <div class="container-buttons">
                        <button class="not-a-button" id="button-edit-user-${user.uuid}"><i class="fa-solid fa-pen fa-2xl"></i></i></button>
                        <button class="not-a-button" id="button-delete-user-${user.uuid}"><i class="fa-regular fa-trash-can fa-2xl"></i></i></button>
                    </div>
                </li>
    `);
            const buttonEditUser = document.querySelector(`#button-edit-user-${user.uuid}`);
            buttonEditUser.addEventListener("click", () => {
                const containerModalEditUser = document.querySelector(".container-modal-edit-user");
                containerModalEditUser.classList.remove("hidden");

                const buttonEditUser = document.querySelector("#button-edit-user");
                buttonEditUser.addEventListener("click", async () =>{
                    const newKindOfWork = document.querySelector("#work-modality").value;
                    const newProfessionalLevel = document.querySelector("#professional-level").value;
                    await updateUser(newKindOfWork,newProfessionalLevel,user.uuid);
                    await renderAllUsers();
                })

                const buttonCloseEditUser = document.querySelector(".container-modal-edit-user .button-close");
                buttonCloseEditUser.addEventListener("click", ()=>{
                    containerModalEditUser.classList.add("hidden");
                })
            });
            const buttonDeleteUser = document.querySelector(`#button-delete-user-${user.uuid}`)  ;
            buttonDeleteUser.addEventListener ("click", async () => {
                toastConfirmDeleteUser(user.name);
                    const buttonConfirmToast = document.querySelector("#toast #button-confirm");
                    buttonConfirmToast.addEventListener("click", async () =>{
                        await deleteUser(user.uuid);
                        renderAllUsers();
                    });
            }); 
        }
        
    })
}
renderAllUsers();


