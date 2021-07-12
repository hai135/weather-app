const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('p:nth-child(3)')
const messageTwo = document.querySelector('p:nth-child(4)')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    const image = document.querySelector('img')
    if (image) {
        image.parentNode.removeChild(image)
    }
    fetch('/weather?address=' + search.value)
        .then((res) => res.json())
        .then((data) => {
            let { location, forecastData, icon, error } = data
            if (!error) {
                messageOne.textContent = location
                messageTwo.textContent = forecastData
                let img = document.createElement('img')
                img.setAttribute('src', icon)
                weatherForm.appendChild(img)
            } else {
                messageOne.textContent = error
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

