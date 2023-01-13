import { getUserCoworkers, getUserProfile, updateUserProfile, getUserAllDepartaments } from "./requests.js";
import { toggleMenu } from "./toggleMenu.js";

toggleMenu();

const buttonLogout = document.querySelector("#button-logout");
buttonLogout.addEventListener("click",()=>{
    localStorage.clear();
})


const buttonChangeInfo = document.querySelector(".change-info-button");
const modalEditProfile = document.querySelector(".modal-edit-profile");
buttonChangeInfo.addEventListener("click", () => {
    modalEditProfile.classList.toggle("hidden");

});
const buttonCloseChangeInfo = document.querySelector(".modal-edit-profile .button-close");
buttonCloseChangeInfo.addEventListener("click", () => {
    modalEditProfile.classList.toggle("hidden");
})

async function regiterUpdateUser(){
    const allInputs = document.querySelectorAll(".modal-edit-profile form input");
    const allInputsArr = Array.prototype.slice.call(allInputs);
    let name = "";
    let email = "";
    let password = "";
    allInputsArr.forEach(input => {
        switch(input.id){
            case "name":
                name = input.value
                break;
            case "email":
                email = input.value
                break;
            case "password":
                password = input.value
                break
        }
    });
    await updateUserProfile(name,password,email);
}
const buttonConfirmEdit = document.querySelector("#button-confirm-edit");
buttonConfirmEdit.addEventListener("click", async () => {
    await regiterUpdateUser();
    renderUserProfile();
})

async function renderUserProfile(){
    const userProfile = await getUserProfile();
    const profileInfo = document.querySelector(".profile-info");

    profileInfo.innerHTML = "";
    profileInfo.insertAdjacentHTML("beforeend", `
        <h2>${userProfile.username}</h2>
        <p>${userProfile.email}</p>
        <p>${userProfile.professional_level ? userProfile.professional_level : ""}</p>
        <p>${userProfile.kind_of_work ? userProfile.kind_of_work : ""}</p>
    `)
}
renderUserProfile();

async function renderUserAllDepartaments(){
    const userAllDepartaments = await getUserAllDepartaments();
    const userProfile = await getUserProfile();
    const container = document.querySelector("main div.container");
    if(!userAllDepartaments){
        container.insertAdjacentHTML("beforeend",`
        <section class="company">
                    <div class="container-employees center">
                        <ul class="all-employees">
                            <h1>Você ainda não foi contratado</h1>
                        </ul>
                    </div>
                </section>
        `)
    }else{
        userAllDepartaments.departments.filter(company => {
            if(userProfile.department_uuid == company.uuid){

                container.insertAdjacentHTML("beforeend", `
                    <section class="company">
                        <div class="company-info">
                            <h2>${userAllDepartaments.name} - ${company.name}</h2>
                        </div>
                        <div class="container-employees">
                            <ul class="all-employees" id="employees-list-${company.uuid}">
                                
                            </ul>
                        </div>
                    </section>
                `);
                renderUserCoworkers(company.uuid);
            }
        })
    }

}
renderUserAllDepartaments();
async function renderUserCoworkers(companyId){
    const userCoworkers = await getUserCoworkers();
    const employeesList = document.querySelector(`#employees-list-${companyId}`);
        userCoworkers.forEach(company =>{
            company.users.forEach(coworker => {
                employeesList.insertAdjacentHTML("beforeend", `
                    <li class="employee">
                        <p><strong>${coworker.username}</strong></p>
                        <p>${coworker.professional_level}</p>
                    </li>
                `)
            })
        })
}