const appliedForm = document.getElementById('applied')
const heardBackForm = document.getElementById('heard-back')
const rejectedForm = document.getElementById('rejected')
const interviewForm = document.getElementById('interview')

const appliedFormButton = document.getElementById('applied-form-button')
const heardBackFormButton = document.getElementById('heard-back-form-button')
const rejectedFormButton = document.getElementById('rejected-form-button')
const interviewedFormButton = document.getElementById('interviewed-form-button')



function toggleFormDisplay(form, button){
    form.style.display = 'none'
    button.addEventListener('click', function(){
        if(form.style.display != "none"){
            form.style.display ="none"
        }
        else(form.style.display = 'flex')
    })
    
}

toggleFormDisplay(appliedForm, appliedFormButton)
toggleFormDisplay(heardBackForm, heardBackFormButton)
toggleFormDisplay(rejectedForm, rejectedFormButton)
toggleFormDisplay(interviewForm, interviewedFormButton)