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

const barsIcon = document.getElementById('bars-icon')
const formSelector = document.getElementById('form-selector')

// onValue Functions
onValue(jobStatsInDB, function(snapshot){
    if(snapshot.exists()){
        clearList(jobsAppliedTo)
        let jobsArray = Object.entries(snapshot.val())
        for(const job of jobsArray){
            returnDataFromDB(job, "jobs", jobsAppliedTo, 'jobs');
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
        for(const job of jobsArray){
            returnDataFromDB(job, "jobsHeardBackFrom", jobsHeardBackFrom, 'jobsHeardBackFrom');
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
        for(const job of jobsArray){
            returnDataFromDB(job, "jobsRejectedFrom", jobsRejectedFrom, 'jobsRejectedFrom');
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
        for(const job of jobsArray){
            returnDataFromDB(job, "jobsInterviewedFor", jobsInterviewedFor, 'jobsInterviewedFor');
        }
    }
    else{
        let noJobsMessage = document.createElement('p')
        noJobsMessage.textContent = "No jobs interviewed for or any stats yet"
        jobsInterviewedFor.appendChild(noJobsMessage)
    }
 });
 
// Reading Data
function returnDataFromDB(itemValue, databaseRef, dbArea, areaID){
    let newElement = document.createElement('li')
    newElement.className = "database-list-item"
    newElement.textContent = itemValue[1]
    dbArea.appendChild(newElement)
    newElement.addEventListener("click", function(){
        let exactLocationOfItem = ref(database,`${areaID}/${itemValue[0]}`)
        console.log(exactLocationOfItem);
        remove(exactLocationOfItem)
        toggleChildrenVisibility(dbArea)
    })
 }
 
function getCountFromDB(databaseRef, dbArea){
    onValue(databaseRef, function(snapshot){
        if(snapshot.exists()){
            let data = snapshot.val();
            let count = Object.keys(data).length
            let newElement = document.createElement('h3')
            newElement.className = 'stat-number'
            newElement.textContent = count
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
// Submitting Data
function addButtonClickListener(button, inputField, databaseRef, dbArea){
    button.addEventListener('click', function(){
        if(inputField.value.trim() !== ""){
            push(databaseRef, inputField.value)
            inputField.value = ''
            toggleChildrenVisibility(dbArea)
        }
    })
}
// Helper Functions
function clearList(listArea){
    listArea.innerHTML = ""
}
// Toggles and such
const forms = [appliedForm, heardBackForm, rejectedForm, interviewForm];
function hideAllForms() {
    forms.forEach(form => {
        if (form.style.display !== 'none') {
            form.style.display = 'none';
        }
    });
}
barsIcon.addEventListener('click', function(){
    hideAllForms()
    if(formSelector.style.display !== 'flex'){
        anime({
            targets: formSelector,
            opacity: [0,1],
            duration: 6000,
            begin: function(anim) {
                formSelector.style.display = 'flex';
            }
        });
    }
    else {
        anime({
            targets: formSelector,
            opacity: [1,0],
            duration: 500,
            complete: function(anim) {
                formSelector.style.display = 'none';
            }
        });
    }
})
function toggleFormDisplay(form, button){
    button.addEventListener('click', function(){
        hideAllForms()
        if(form.classList.contains('show')){
            form.classList.remove('show');
            setTimeout(function() {
                form.style.display = 'none';
            }, 500);
        }
        else{
            form.style.display = 'flex';
            setTimeout(function() {
                form.classList.add('show');
            }, 0);
        }
    })
}
function toggleChildrenVisibility(dbArea){
    let children = dbArea.querySelectorAll('.database-list-item')
    children.forEach(child => {
        if (child.style.display !== "list-item"){
            anime({
                targets: child,
                opacity: [0,1],
                duration: 500,
                easing: 'easeOutExpo',
                begin: function(anim) {
                    child.style.display = 'list-item';
                }
            });
        }
        else {
            anime({
                targets: child,
                opacity: [1,0],
                duration: 500,
                easing: 'easeOutExpo',
                complete: function(anim) {
                    child.style.display = 'none';
                }
            });
        }
    })
}

// Event Listeners and Button functions

addButtonClickListener(submitAppliedButton, submitAppliedInput, jobStatsInDB, jobsAppliedTo)
addButtonClickListener(submitHeardBackButton, submitHeardBackInput, jobsHeardBackFromInDB, jobsHeardBackFrom)
addButtonClickListener(submitRejectedButton, submitRejectedInput, jobsRejectedFromInDB, jobsRejectedFrom)
addButtonClickListener(submitInterviewedButton, submitInterviewedInput, jobsInterviewedForInDB, jobsInterviewedFor)

getCountFromDB(jobStatsInDB, jobsAppliedTo);
getCountFromDB(jobsHeardBackFromInDB, jobsHeardBackFrom);
getCountFromDB(jobsRejectedFromInDB, jobsRejectedFrom);
getCountFromDB(jobsInterviewedForInDB, jobsInterviewedFor);

toggleFormDisplay(appliedForm, appliedFormButton)
toggleFormDisplay(heardBackForm, heardBackFormButton)
toggleFormDisplay(rejectedForm, rejectedFormButton)
toggleFormDisplay(interviewForm, interviewedFormButton)
