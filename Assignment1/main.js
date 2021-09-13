/*
	WEB 303
	Starting file for Assignment 1 
	Trevor Slobodnick
*/

$(document).ready(function () {
	//Declare variables
	let salaryInput = $("#salary");
	let percentInput = $("#percent");
	let spendSpan = $("span#spend");

	//Adding change event listeners
	salaryInput.change(onInputChanged);
	percentInput.change(onInputChanged);

	//Defining the function to call when the input has changed
	function onInputChanged(e){
		//Make sure both fields have a value before trying to make a calculation
		if(salaryInput.val() != "" && percentInput.val() != ""){
			//Calculate the spend amount
			let spendAmount = salaryInput.val() * percentInput.val() / 100;
			//Get rid of extra decimal places
			spendAmount = spendAmount.toFixed(2);
			//Set text of spendSpan to the spendAmount, with a dollar sign in front
			spendSpan.text("$" + spendAmount);
		}
	}
});