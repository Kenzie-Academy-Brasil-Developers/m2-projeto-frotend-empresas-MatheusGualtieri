import { getAllCompanies, getAllSectors, getCompaniesBySector } from "./requests.js";
import { toggleMenu } from "./toggleMenu.js";

toggleMenu();
async function renderCompanies(){
    const allCompanies = await getAllCompanies();
    const companiesListHTML = document.querySelector(".container-enterprises");

    companiesListHTML.innerHTML = "";

    allCompanies.forEach(enterprise => {
        companiesListHTML.insertAdjacentHTML("beforeend", `
        
            <li class="enterprise">
                <h2>${enterprise.name}</h2>
                <div class="enterprise-info">
                    <p>${enterprise.opening_hours}</p>
                    <button class="button button-tag">${enterprise.sectors.description}</button>
                </div>
            </li>
                
        `)
    });
}
renderCompanies();

const inputSelect = document.querySelector("#sectors");

async function insertAllSectorsOnSelect(){
    const allSectors = await getAllSectors();
    

    allSectors.forEach(sector =>  {
        const option = document.createElement("option");
        option.value = sector.description;
        option.text = sector.description;
        inputSelect.add(option)
    })
}
insertAllSectorsOnSelect();

async function renderCompaniesBySector(name){
    const companiesBySector = await getCompaniesBySector(name);
    const companiesListHTML = document.querySelector(".container-enterprises");

    companiesListHTML.innerHTML = "";

    companiesBySector.forEach(enterprise => {
        companiesListHTML.insertAdjacentHTML("beforeend", `
        
            <li class="enterprise">
                <h2>${enterprise.name}</h2>
                <div class="enterprise-info">
                    <p>${enterprise.opening_hours}</p>
                    <button class="button button-tag">${enterprise.sectors.description}</button>
                </div>
            </li>
                
        `)
    })
}

inputSelect.addEventListener("click", ()=>{
    const sector = inputSelect.value;
    if(sector == "none"){
        renderCompanies()
    }else{
        renderCompaniesBySector(sector);
    }
})