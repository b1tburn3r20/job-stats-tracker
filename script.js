import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove,} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
} 

const app =  initializeApp(appSettings)
const database = getDatabase(app)
const jobStatsInDB = ref(database, "jobs")
const jobsHeardBackFromInDB = ref(database, "jobsHeardBackFrom")
const jobsRejectedFromInDB = ref(database, "jobsRejectedFrom")
const jobsInterviewedForInDB = ref(database, "jobsInterviewedFor")


const appliedForm = document.getElementById('applied')
const heardBackForm = document.getElementById('heard-back')
const rejectedForm = document.getElementById('rejected')
const interviewForm = document.getElementById('interview')

const appliedFormButton = document.getElementById('applied-form-button')
const heardBackFormButton = document.getElementById('heard-back-form-button')
const rejectedFormButton = document.getElementById('rejected-form-button')
const interviewedFormButton = document.getElementById('interviewed-form-button')

const jobsAppliedTo = document.getElementById('jobs-applied-to')
const jobsHeardBackFrom = document.getElementById('jobs-heard-back-from')
const jobsRejectedFrom = document.getElementById('jobs-rejected-from')
const jobsInterviewedFor = document.getElementById('jobs-interviewed-for')

const submitAppliedButton = document.getElementById('submit-applied')
const submitAppliedInput = document.getElementById('submit-applied-input')
const submitHeardBackButton = document.getElementById('submit-heard-back-button')
const submitHeardBackInput = document.getElementById('submit-heard-back-input')
const submitRejectedButton = document.getElementById('submit-rejected-button')
const submitRejectedInput = document.getElementById('submit-rejected-input')
const submitInterviewedButton = document.getElementById('submit-interviewed-button')
const submitInterviewedInput = document.getElementById('submit-interviewed-input')



onValue(jobStatsInDB, function(snapshot){
    if(snapshot.exists()){
        clearList(jobsAppliedTo)
        let jobsArray = Object.entries(snapshot.val())
        jobsArray.reverse()
        for(const job of jobsArray){
            returnDataFromDB(job, jobStatsInDB, jobsAppliedTo);
        }
    }
    else{
        let noJobsMessage = document.createElement('p')
        noJobsMessage.textContent = "No jobs applied for or any stats yet"
        jobsAppliedTo.appendChild(noJobsMessage)
    }
  });
  
  onValue(jobsHeardBackFromInDB, function(snapshot){
    if(snapshot.exists()){
        clearList(jobsHeardBackFrom)
        let jobsArray = Object.entries(snapshot.val())
        jobsArray.reverse()
        for(const job of jobsArray){
            returnDataFromDB(job, jobsHeardBackFromInDB, jobsHeardBackFrom);
        }
    }
    else{
        let noJobsMessage = document.createElement('p')
        noJobsMessage.textContent = "No jobs heard back from or any stats yet"
        jobsHeardBackFrom.appendChild(noJobsMessage)
    }
  });
  
  onValue(jobsRejectedFromInDB, function(snapshot){
    if(snapshot.exists()){
        clearList(jobsRejectedFrom)
        let jobsArray = Object.entries(snapshot.val())
        jobsArray.reverse()
        for(const job of jobsArray){
            returnDataFromDB(job, jobsRejectedFromInDB, jobsRejectedFrom);
        }
    }
    else{
        let noJobsMessage = document.createElement('p')
        noJobsMessage.textContent = "No jobs rejected from or any stats yet"
        jobsRejectedFrom.appendChild(noJobsMessage)
    }
  });
  
  onValue(jobsInterviewedForInDB, function(snapshot){
    if(snapshot.exists()){
        clearList(jobsInterviewedFor)
        let jobsArray = Object.entries(snapshot.val())
        jobsArray.reverse()
        for(const job of jobsArray){
            returnDataFromDB(job, jobsInterviewedForInDB, jobsInterviewedFor);
        }
    }
    else{
        let noJobsMessage = document.createElement('p')
        noJobsMessage.textContent = "No jobs interviewed for or any stats yet"
        jobsInterviewedFor.appendChild(noJobsMessage)
    }
  });


  function getCountFromDB(databaseRef, dbArea){
    onValue(databaseRef, function(snapshot){
        if(snapshot.exists()){
            let data = snapshot.val();
            let count = Object.keys(data).length
            let newElement = document.createElement('h3')
            newElement.textContent = count
            console.log(count);
            dbArea.prepend(newElement)
            newElement.addEventListener('click', function(){
                toggleChildrenVisibility(dbArea);
             });
            return count;
        }
        else{
            console.log("No data in the database reference");
            let newElement = document.createElement('h3')
            newElement.textContent = 0
            dbArea.appendChild(newElement)
            return 0;
        }
    });
}


 function toggleChildrenVisibility(dbArea){
    let children = dbArea.querySelectorAll('.database-list-item')
    children.forEach(child => {
        if (child.style.display !== "flex"){
            child.style.display = 'flex'
        }
        else {
            child.style.display = "none"
        }
    })
 }

function toggleFormDisplay(form, button){
    form.style.display = 'none'
    button.addEventListener('click', function(){
        if(form.style.display != "none"){
            form.style.display ="none"
        }
        else(form.style.display = 'flex')
    })
    
}

function clearList(listArea){
    listArea.innerHTML = ""
}

// function clearInput()

function returnDataFromDB(itemValue, databaseRef, dbArea){
    let newElement = document.createElement('li')
    newElement.className = "database-list-item"
    newElement.textContent = itemValue[1]
    dbArea.appendChild(newElement)
}
 

function addButtonClickListener(button, inputField, databaseRef){
    button.addEventListener('click', function(){
        if(inputField.value.trim() !== ""){
            console.log(inputField.value);
            push(databaseRef, inputField.value)
        }
        // clearInput(inputField)
    })
}


addButtonClickListener(submitAppliedButton, submitAppliedInput, jobStatsInDB)
addButtonClickListener(submitHeardBackButton, submitHeardBackInput, jobsHeardBackFromInDB)
addButtonClickListener(submitRejectedButton, submitRejectedInput, jobsRejectedFromInDB)
addButtonClickListener(submitInterviewedButton, submitInterviewedInput, jobsInterviewedForInDB)

getCountFromDB(jobStatsInDB, jobsAppliedTo);
getCountFromDB(jobsHeardBackFromInDB, jobsHeardBackFrom);
getCountFromDB(jobsRejectedFromInDB, jobsRejectedFrom);
getCountFromDB(jobsInterviewedForInDB, jobsInterviewedFor);

toggleFormDisplay(appliedForm, appliedFormButton)
toggleFormDisplay(heardBackForm, heardBackFormButton)
toggleFormDisplay(rejectedForm, rejectedFormButton)
toggleFormDisplay(interviewForm, interviewedFormButton)
