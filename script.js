import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
} 

const app =  initializeApp(appSettings)
const database = getDatabase(app)
const jobStatsInDB = ref(database, "jobs")




const appliedForm = document.getElementById('applied')
const heardBackForm = document.getElementById('heard-back')
const rejectedForm = document.getElementById('rejected')
const interviewForm = document.getElementById('interview')

const appliedFormButton = document.getElementById('applied-form-button')
const heardBackFormButton = document.getElementById('heard-back-form-button')
const rejectedFormButton = document.getElementById('rejected-form-button')
const interviewedFormButton = document.getElementById('interviewed-form-button')

const jobsAppliedFor = document.getElementById('jobs-applied-for')
const jobsHeardBackFrom = document.getElementById('jobs-heard-back-from')
const jobsRejectedFrom = document.getElementById('jobs-rejected-from')
const jobsInterviewedFor = document.getElementById('jobs-interviewed-for')

const submitAppliedButton = document.getElementById('submit-applied')
const submitAppliedInput = document.getElementById('submit-applied-input')


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

toggleFormDisplay(appliedForm, appliedFormButton)
toggleFormDisplay(heardBackForm, heardBackFormButton)
toggleFormDisplay(rejectedForm, rejectedFormButton)
toggleFormDisplay(interviewForm, interviewedFormButton)



onValue(jobStatsInDB, function(snapshot){
    if(snapshot.exists()){
        // clearList(jobsAppliedFor)
        let jobsArray = Object.entries(snapshot.val())
        jobsArray.reverse()
        for(const job of jobsArray){
            createJobItem(job)
        }
    }
    else{
        // clearList(jobsAppliedFor)
        let noJobsMessage = document.createElement('p')
        noJobsMessage.textContent = "No jobs applied for or any stats yet"
        jobsAppliedFor.appendChild(noJobsMessage)
    }
})
// function clearInput()

function createJobItem(itemValue){
    let newElement = document.createElement('li')
    newElement.textContent = itemValue[1]
    jobsAppliedFor.appendChild(newElement)
    newElement.addEventListener('click', function(){
        let exactLocationOfJobItem = ref(database, `jobs/${itemValue[0]}`)
        remove(exactLocationOfJobItem)
    })
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