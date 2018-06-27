let text = document.querySelector('.take-input__input')
let button = document.querySelector('.take-input__send-button')

button.addEventListener('click', () => {
	if (text.value != '') {
		let xhr = new XMLHttpRequest()
		xhr.open('POST', '/post', true)
		xhr.setRequestHeader('Content-type', 'application/json')

		let defaultButtonTextContent = button.textContent
		xhr.onloadstart = () => button.textContent = '...'

		xhr.onloadend = function() {
			/*
				<div class="results">
					<div class="results__row">
						<div class="results__text">${response.idea}</div>
					</div>
					...
					...
				</div>
			*/

			let response = JSON.parse(this.responseText)

			let new_results__row = document.createElement('div')
			new_results__row.classList.add('results__row')

			let results__text = document.createElement('div')
			results__text.classList.add('results__text')
			results__text.appendChild(document.createTextNode(response.idea))

			new_results__row.appendChild(results__text)

			document
				.querySelector('.results')
				.insertBefore(new_results__row, document.querySelector('.results__row'))

			// Remove text from <textarea/> and gain focus again.
			text.value = ''
			text.focus()

			button.textContent = defaultButtonTextContent
		}

		xhr.send(JSON.stringify({ id: Date.now(), idea: text.value }))
	}
})

text.addEventListener('keypress', e => {
	if (e.code === 'Enter') {
		button.click()
		text.value = ''

		e.preventDefault()
		return false
	}
})
