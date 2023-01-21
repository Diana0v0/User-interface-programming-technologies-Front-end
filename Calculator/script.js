// references
let resultBox = document.querySelector("input[type='text']")
let buttons = document.querySelectorAll("input[type='button']")

// iterate mapping
buttons.forEach((button) => {
	// add click event listener
	button.addEventListener('click', (e) => {
		// if user pressesClear Everything
		if (e.target.value === 'CE') {	
			// remove all characters from input (set as empty string)
			resultBox.value = ''
		// check if user presses result	
		} else if (e.target.value === '=') {
			// check whether resultBox has value or not
			if (resultBox.value) 
				// evaluate resultBox value if it exists
				resultBox.value = eval(resultBox.value) 
		// check if user press clear one symbol button
		} else if (e.target.value === 'C') {
			// if resultBox value exists
			if (resultBox.value) 
				// remove last symbol
				resultBox.value = resultBox.value.slice(0, -1)
		// default - user presses button
		} else {
			// add button value into input
			resultBox.value += e.target.value
		}
	})
})