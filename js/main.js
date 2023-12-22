var siteName=document.getElementById("siteNameInput")
var siteUrl=document.getElementById("siteUrlInput")
var tbody=document.getElementById("tbody")
var deleteBtn=document.querySelectorAll("#deleteBtn")
var visitBtn=document.querySelectorAll("#visitBtn")
var siteContainer;
var alertBox=document.getElementById("alertbox")
var body=document.getElementsByTagName("header")


if (localStorage.getItem('Sites')!=null) {
    siteContainer=JSON.parse(localStorage.getItem("Sites"));
    displaySite(siteContainer);
}else{
    siteContainer=[];
}

function addSite() {
    if (validateSiteName()&&validateSiteUrl()) {
        var site={
            siteName:siteName.value,
            siteUrl:siteUrl.value
        }
        siteContainer.push(site)
        localStorage.setItem("Sites",JSON.stringify(siteContainer))
    
        clearForm();
        displaySite(siteContainer)
        alertBox.classList.add("d-none")

    }else{
       alertBox.classList.replace("d-none","d-block")
    
    }
}
function closeBtn() {
    document.body.addEventListener("click",function () {
            alertBox.classList.replace("d-block","d-none")
            console.log("hello");
           })
}
function displaySite(arr) { 
    var cartoona=``
    
    for (let i = 0; i < arr.length; i++) {
        deleteIndex=i;
        siteIndex=i+1;
        cartoona+=`<tr>
        <td>${siteIndex}</td>
        <td>${arr[i].siteName}</td>
        <td><button id="visitBtn" class="btn pe-2"><i class="fa-solid fa-eye pe-2"></i>Visit</button>
        </td>
        <td><button id="deleteBtn" onclick="deleteSite(${i})" class="btn  pe-2"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
        </tr>
    `
        
    }
    tbody.innerHTML=cartoona
} 

function clearForm(){
    siteName.value='';
    siteUrl.value='';
    
}

function deleteSite(deleteIndex) {
    siteContainer.splice(deleteIndex,1)
    localStorage.setItem("Sites",JSON.stringify(siteContainer))
    displaySite(siteContainer)
}


function validateSiteName() {
    if (/^[A-Z]{1}[a-z]{3,10}\s?\S{0,5}$/.test(siteName.value)) {
        siteName.classList.replace('is-invalid','is-valid')
        return true
    }else{
        siteName.classList.add('is-invalid')
        return false
    }
}

function validateSiteUrl() {
    if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(siteUrl.value)    ) {
        siteUrl.classList.replace('is-invalid','is-valid')
        return true
    }
    else{
        siteUrl.classList.add('is-invalid')
        return false
    }
}

