const apiKey = '6445013bb8934b5bab495030231202'

const form = document.querySelector('#form')
const inputCity = document.querySelector('#inputCity')
const header = document.querySelector('.header')

function removeCard() {
	const pervCard = document.querySelector('.card')
	if (pervCard) pervCard.remove()
}

function showError(errorMessage) {
	const html = `<div class="card">${data.error.message}</div>`
	header.insertAdjacentHTML('afterend', html)
}

function showCard(name, country, tempC, condition) {
	const html = `<div class="card">
    <div class="card-text">
        <h2 class="card-city">${name}<span>${country}</span></h2>
        <div class="card-temperature"> ${tempC} <sup>°c</sup></div>
        <div class="card-weather">${condition}</div>
    </div>
    <img src="img/sun-cloud.png" alt="weather" class="card-img" />
</div>`
	header.insertAdjacentHTML('afterend', html)
}

async function getWeather(city) {
	const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
	const response = await fetch(url)
	const data = await response.json()
    return data 
}

form.onsubmit = async evt => {
	evt.preventDefault()
	let city = inputCity.value.trim()
	const data = await getWeather(city)

	if (data.error) {
		removeCard()
		showError(data.error.message)
	} else {
		removeCard()
		showCard(
			data.location.name,
			data.location.country,
			data.current.temp_c,
			data.current.condition.text
		)
	}
	inputCity.value = ''
}

 
