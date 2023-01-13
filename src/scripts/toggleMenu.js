export function toggleMenu(){
    const menu = document.querySelector(".menu");
    const menuButton = document.querySelector(".menu-button");
    
    menuButton.addEventListener("click", ()=>{
        menu.classList.toggle("hidden");
        if(menuButton.innerHTML === '<i class="fa-solid fa-bars fa-2x"></i>'){
            menuButton.innerHTML = "";
            menuButton.insertAdjacentHTML("beforeend",`
            <i class="fa-solid fa-xmark fa-2xl"></i>
            `)
        }
        if(menuButton.innerHTML === '<i class="fa-solid fa-xmark fa-2xl"></i>'){
            menuButton.innerHTML = "";
            menuButton.insertAdjacentHTML("beforeend",`
            <i class="fa-solid fa-bars fa-2x"></i>
            `)
        }

    })
}   
