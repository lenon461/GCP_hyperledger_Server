document.querySelector(`#query`).addEventListener(`click`, () => {
	const xhr = new XMLHttpRequest()

	if(!xhr) {
		throw new Error(`XHR 호출 불가`)
	}
	xhr.open(`GET`, `/querys`)
	xhr.setRequestHeader(`Content-Type`, `application/json`)
	xhr.addEventListener(`readystatechange`, () => {
		xhr.readyState === 4 ? (
			xhr.status === 200 ? (
				console.log(JSON.parse(JSON.parse(JSON.parse(xhr.responseText))))
			) : (
				console.error(`Err XHR`)
			)
		) : (
			false
		)
	})
	xhr.send()
})
document.querySelector(`#invoke`).addEventListener(`click`, () => {

	const xhr = new XMLHttpRequest()

	if(!xhr) {
		throw new Error(`XHR 호출 불가`)
	}
	xhr.open(`GET`, `/invokes`)
	xhr.setRequestHeader(`Content-Type`, `application/json`)
	xhr.addEventListener(`readystatechange`, () => {
		xhr.readyState === 4 ? (
			xhr.status === 200 ? (
				console.log(`success`)
			) : (
				console.error(`Err XHR`)
			)
		) : (
			false
		)
	})
	xhr.send()
})
