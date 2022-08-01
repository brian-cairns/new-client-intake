let submit = document.getElementById('submit')
console.log(submit)
const formName = 'newClientIntake'
console.log('form: ' + formName)
let newForm = {}
let client = ''

let clientName = document.querySelector('input#clientName')
clientName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.clientName = e.target.value;
  console.log(newForm.clientName);
  client = newForm.clientName
  })
  
let intakeDate = document.querySelector('input#intakeDate')
intakeDate.addEventListener('change', (e) => {
	newForm.intakeDate = e.target.value;
  console.log(newForm.intakeDate);
})

let dob = document.querySelector('input#dob')
dob.addEventListener('change', (e) => {
	newForm.dob = e.target.value;
  console.log(newForm.dob);
})

let age = document.querySelector('input#age')
age.addEventListener('change', (e) => {
	newForm.age = e.target.value;
  console.log(newForm.age);
})

let grade = document.querySelector('input#grade')
grade.addEventListener('change', (e) => {
	newForm.grade = e.target.value;
  console.log(newForm.grade);
})

let caregiverName = document.querySelector('input#caregiverName')
caregiverName.addEventListener('change', (e) => {
	newForm.caregiverName = e.target.value;
  console.log(newForm.caregiverName);
})

let caregiverPhone = document.querySelector('input#caregiverPhone')
caregiverPhone.addEventListener('change', (e) => {
	newForm.caregiverPhone = e.target.value;
  console.log(newForm.caregiverPhone);
})

let caregiverEmail = document.querySelector('input#caregiverEmail')
caregiverEmail.addEventListener('change', (e) => {
	newForm.caregiverEmail = e.target.value;
  console.log(newForm.caregiverEmail);
})

let diagnosis = document.querySelector('input#diagnosis')
diagnosis.addEventListener('change', (e) => {
	newForm.diagnosis = e.target.value;
  console.log(newForm.diagnosis);
})

let sensoryNeeds = document.querySelector('input#sensoryNeeds')
sensoryNeeds.addEventListener('change', (e) => {
	newForm.sensoryNeeds = e.target.value;
  console.log(newForm.sensoryNeeds1);
})

let strengths = document.querySelector('input#strengths')
strengths.addEventListener('change', (e) => {
	newForm.strengths = e.target.value;
  console.log(newForm.strengths);
})

let needs = document.querySelector('input#needs')
needs.addEventListener('change', (e) => {
	newForm.needs = e.target.value;
  console.log(newForm.needs);
})

let medicalConditions = document.querySelector('input#medicalConditions')
medicalConditions.addEventListener('change', (e) => {
	newForm.medicalConditions = e.target.value;
  console.log(newForm.medicalConditions);
})

let services = document.querySelector('input#services')
services.addEventListener('change', (e) => {
	newForm.services = e.target.value;
  console.log(newForm.services);
})

let availability = document.querySelector('input#availability')
availability.addEventListener('change', (e) => {
    newForm.availability = e.target.value;
    console.log(newForm.availability)
})

let hrsOfServices = document.querySelector('input#hrsOfServices')
hrsOfServices.addEventListener('change', (e) => {
    newForm.hrsOfServices = e.target.value;
    console.log(newForm.hrsOfServices)
})
    
let notes = document.getElementById('notes')
notes.addEventListener('change', (e) => {
    newForm.notes = e.target.value;
    console.log(newForm.notes)
})

document.getElementById('submit').addEventListener("click", async (event) => {
  submitForm(newForm, 'newClientIntake')
  sessionStorage.setItem('userName', newForm.clientName)
  updateClient(newForm)
  const message = '<p>Complete the <a href="/forms/new-client-intake-form">Client Intake Form</a></p>'
  removeNotice(newForm.clientName, message)
})

let printForm = document.getElementById('printToPDF')
printForm.style.display = 'none'

async function submitForm(data, form) {
  const document = {
    'form': form,
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/form', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then(response => response.json())
    .then(data => respond(data)) 
    .catch((err) => showError(err))
}

function respond(data) {
  let formId = data.formId
  if (formId) {
    showSuccess(formId) 
  } else {
    showError(data.error)
  }
}

function showSuccess(formId) {
  document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
  printForm.style.display = 'inline';
  printForm.addEventListener('click', (e) => {
  location.href = `https://phoenix-freedom-foundation-backend.webflow.io/completed-forms/new-client-intake-form?id=${client}`
  })
}


function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}


async function updateClient(clientData) {
	console.log(clientData)
  const document = { data: clientData }
  fetch('https://pffm.azurewebsites.net/updateClient', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(document)
  })
    .then(() => console.log('resolved'))
    .catch(console.error)
}

async function removeNotice(name, message) {
  const url = 'https://pffm.azurewebsites.net/notices'
  let data = {
  			clientName: name,
        notice: message
        }
   fetch(url, {
    method: "PUT",
    headers: {
    	"Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      if(response != 500 || response != 403) {console.log('deleted', sessionStorage.getItem('userName'))} 
      //location.href = 'https://phoenix-freedom-foundation-backend.webflow.io/client-portal'
    })
    .catch(console.error)
}

// post Notice to manager
  
