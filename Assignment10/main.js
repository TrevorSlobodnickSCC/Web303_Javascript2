//in order for the submit button to become enabled
//  1. username must contain a value
//  2. password must have length of 10 or more
//  3. confirm password must be the same as password
//  4. accept tos must be checked
//  5. A country must be select (not default)

const usernameInp = document.getElementById("username");
const passwordInp = document.getElementById("password");
const confirmPasswordInp = document.getElementById("confirm-password");
const acceptTOSBox = document.getElementById("accept-tos");
const countrySelect = document.getElementById("country-select");
const submitBtn = document.getElementById("submit");

submitBtn.disabled = true;

usernameInp.addEventListener("input", onFormChange);
passwordInp.addEventListener("input", onFormChange);
confirmPasswordInp.addEventListener("input", onFormChange);
acceptTOSBox.addEventListener("click", onFormChange);
countrySelect.addEventListener("change", onFormChange);
submitBtn.addEventListener("click", onFormSubmit);

setCountryOptions();

/**
 * This function is called when the form is changed
 */
function onFormChange(e){
    //even though the submit button is included in this event,
    //it has its own event, so dont include it in this one
    if(e.target != submitBtn){
        submitBtn.disabled = validateForm();
    }
}

/**
 * returns true if form is valid, false otherwise
 */
function validateForm(){
    if(usernameInp.value != ""){
        if(passwordInp.value.length >= 10){
            if(confirmPasswordInp.value == passwordInp.value){
                if(acceptTOSBox.checked == true){
                    if(countrySelect.value != ""){
                        return false;
                    }
                }
            } 
        }
    }
    return true;
}

/**
 * Event handler for when the form is submitted
 */
function onFormSubmit(e){
    e.preventDefault();
    document.getElementById("message").innerText = "Welcome " + usernameInp.value + "! The country code you selected is " + countrySelect.value;
}

/**
 * Sets the countries for the <select> element
 */
function setCountryOptions(){
    //create array which holds our default option
    const defaultOption = [`<option value="" selected>Select Your Country</option>`];
    //create another array that holds our country options
    const countryOptions = countries.map(country => `<option value="${country.code}">${country.name}</option>`);
    //combine the 2 so the default option appears first
    const optionsArr = defaultOption.concat(countryOptions);
    //set the select element options to the array values (as string)
    countrySelect.innerHTML = optionsArr.join();
}