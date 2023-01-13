import { showToast,toastFailure,toastSucces, toastFailureLogin } from "./toast.js";

export async function getAllCompanies(){
    try{
        const allCompanies = await fetch("http://localhost:6278/companies");
        const allCompaniesJson = await allCompanies.json();
        
        return allCompaniesJson;   
    } catch(error){
        return console.log(error)
    }
     
}

export async function getAllSectors(){
    try{
        const allSectors = await fetch("http://localhost:6278/sectors");
        const allSectorsJson = await allSectors.json();
        
        return allSectorsJson;   
    } catch(error){
        return console.log(error)
    }
}

export async function getCompaniesBySector(name){
    try{
        const allCompaniesBySector = await fetch(`http://localhost:6278/companies/${name}`);
        const allCompaniesBySectorJson = await allCompaniesBySector.json();
        
        return allCompaniesBySectorJson;   
    } catch(error){
        return console.log(error)
    }
}

export async function createUser(name,passWord,mail,professionalLevel){
    const data = {
        username: name,
        password: passWord,
        email: mail,
        professional_level: professionalLevel
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/auth/register`, options);
        const response = await responseJSON.json();
        console.log(response);
        if(response.error){
            toastFailure()
            showToast();
        }else{
            toastSucces();
            showToast();
            return true
        }
        
    } catch(error){
        console.log(error)
        return false;

    }
        
}

export async function login(mail, passWord){
    const data = {
        password: passWord,
        email: mail
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/auth/login`, options);
        const response = await responseJSON.json();
        const responseLocalStorage = JSON.stringify(response)
        localStorage.setItem("TokenLogin",responseLocalStorage)
        if(response.error){
            toastFailureLogin()
            showToast();
        }else{
            return true
        }
        
    } catch(error){
        console.log(error)
        return false;

    }
}
export async function checkUserAuthorization(token){
    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
      }
    }
    try{
        console.log(token);
        const validateUser = await fetch("http://localhost:6278/auth/validate_user", options);
        const validateUSerJson = await validateUser.json();
        console.log(validateUSerJson)
        
        return validateUSerJson;
        
    } catch(error){
        return error;
    }
}
export function dataLocalStorageToken(){
    const dataInLocalStorageJSON = localStorage.getItem('TokenLogin') || null;

    if(dataInLocalStorageJSON){
        const dataInLocalStorage = JSON.parse(dataInLocalStorageJSON);
        
        return dataInLocalStorage;
    }
}

const authorizationAdmin = dataLocalStorageToken();
const tokenAdmin = authorizationAdmin ? authorizationAdmin.token : null;

export async function createDepartamentInCompany(name,description,companyId){
    const data = {
        name: name,
        description: description,
        company_uuid: companyId
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        },
        body: JSON.stringify(data)
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/departments`, options);
        const response = await responseJSON.json();

        if(response.error){
        }else{
            return true
        }
        
    } catch(error){
        console.log(error)
        return false;

    }
        
}

export async function getAllDepartaments(){

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        }
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/departments`, options);
        const response = await responseJSON.json();

        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function getDepartamentsByCompanyId(companyId){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        }
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/departments/${companyId}`, options);
        const response = await responseJSON.json();

        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function updateDepartament(newDescription,departamentId){
    const data = {
        description: newDescription
    }

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        },
        body: JSON.stringify(data)
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/departments/${departamentId}`, options);
        const response = await responseJSON.json();

       return response;
        
    } catch(error){
        console.log(error)
        return error;

    }
}
export async function deleteDepartament(departamentId){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        }
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/departments/${departamentId}`, options);
        const response = await responseJSON.json();

        if(response.error){
        }else{
            return true
        }
        
    } catch(error){
        console.log(error)
        return false;

    }
}

export async function getAllEmployees(){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        }
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/users`, options);
        const response = await responseJSON.json();

        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function hireEmployee(userId, departamentId){
    const data ={
        user_uuid: userId,
            department_uuid: departamentId
    }
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        },
        body: JSON.stringify(data)
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/departments/hire/`, options);
        const response = await responseJSON.json();
        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function dismissEmployee(userId){
    
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        }
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/departments/dismiss/${userId}`, options);
        const response = await responseJSON.json();
        console.log(response)
        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function updateUser(kindOfWork, professionalLevel, userId){
    const data ={
        kind_of_work: kindOfWork,
        professional_level: professionalLevel
    }
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        },
        body: JSON.stringify(data)
    }
    try{
        const responseJSON = await fetch(`http://localhost:6278/admin/update_user/${userId}`, options);
        const response = await responseJSON.json();
        console.log(response)
        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function deleteUser(userId){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        }
    }
    try{
        const responseJSON = await fetch(`http://localhost:6278/admin/delete_user/${userId}`, options);
        const response = await responseJSON.json();
        console.log(response)
        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function getUserProfile(){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        }
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/users/profile`, options);
        const response = await responseJSON.json();

        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function getUserCoworkers(){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        }
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/users/departments/coworkers`, options);
        const response = await responseJSON.json();

        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function getUserAllDepartaments(){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        }
    }

    try{
        const responseJSON = await fetch(`http://localhost:6278/users/departments`, options);
        const response = await responseJSON.json();

        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}

export async function updateUserProfile(userName,passWord,mail){
    const data ={
        username: userName,
        password: passWord,
        email: mail
    }
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenAdmin}`
        },
        body: JSON.stringify(data)
    }
    try{
        const responseJSON = await fetch(`http://localhost:6278/users`, options);
        const response = await responseJSON.json();
        console.log(response)
        if(response.error){
        }else{
            return response
        }
        
    } catch(error){
        console.log(error)
        return error;

    }
}