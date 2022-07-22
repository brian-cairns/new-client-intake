let submit = document.getElementById('submit')
console.log(submit)
const formName = 'newClientIntake'
console.log('form: ' + formName)
let newForm = {}
let newClient = {}

class Cargiver {
  constructor(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

newClient.caregiver = new Cargiver()

let clientName = document.querySelector('input#clientName')
clientName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.clientName = e.target.value;
  newClient.clientName = e.target.value;
  console.log(newForm.clientName);
  })
  
let intakeDate = document.querySelector('input#intakeDate')
intakeDate.addEventListener('change', (e) => {
	newForm.intakeDate = e.target.value;
  console.log(newForm.intakeDate);
})

let dob = document.querySelector('input#dob')
dob.addEventListener('change', (e) => {
	newForm.dob = e.target.value;
  newClient.dob = e.target.event
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
  newClient.caregiver.name = e.target.value;
  console.log(newForm.caregiverName);
})

let caregiverPhone = document.querySelector('input#caregiverPhone')
caregiverPhone.addEventListener('change', (e) => {
	newForm.caregiverPhone = e.target.value;
  newClient.caregiver.phone = e.target.value;
  console.log(newForm.caregiverPhone);
})

let caregiverEmail = document.querySelector('input#caregiverEmail')
caregiverEmail.addEventListener('change', (e) => {
	newForm.caregiverEmail = e.target.value;
  newClient.caregiver.email = e.target.value;
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

let intake_services = document.querySelector('input#intake_services')
intake_services.addEventListener('change', (e) => {
	newForm.intake_services = e.target.value;
  newClient.services = e.target.value;
  console.log(newForm.intake_services);
})

let availability = document.querySelector('input#availability')
availability.addEventListener('change', (e) => {
    newForm.availability = e.target.value;
    console.log(newForm.availability)
})

let hrsOfServices = document.querySelector('input#hrsOfServices')
hrsOfServices.addEventListener('change', (e) => {
    newForm.hrsOfServices = e.target.value;
    newClient.hrsOfServices = e.target.value
    console.log(newForm.hrsOfServices)
})
    
let notes = document.getElementById('notes')
notes.addEventListener('change', (e) => {
    newForm.notes = e.target.value;
    console.log(newForm.notes)
})
    
let caregiverSignature = document.querySelector('input#caregiverSignature')
caregiverSignature.addEventListener('change', (e) => {
    newForm.caregiverSignature = e.target.value;
    console.log(newForm.caregiverSignature)
})
    
let todaysDate = document.getElementById('todaysDate') 
todaysDate.addEventListener('change', (e) => {
  newForm.todaysDate = e.target.value;
  console.log(newForm.todaysDate)
})

document.getElementById('submit').addEventListener("click", async (event) => {
  submitForm(newForm, 'newClientIntake')
  newClient.counselor = 'undetermined';
  newClient.familyTrainer = 'undetermined'
  newClient.hrsUsed = 0;
  newClient.treatmentPlan = 'required'
  newClient.familyTreatmentPlan = 'required'
  newClient.nextReviewDate = 'unset'
  newClient.sessions = [];
  createClient(newClient)
})

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
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}

async function submitForm(data) {
  const document = {
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/client/newClient', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}

function showSuccess() {
    document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}