let weather_container = document.getElementById("weather_container")
let btn_search = document.getElementById("btn_search")

getIP()

function getIP(){
    fetch("http://api.ipstack.com/172.70.203.138?access_key=342494a091580c4d6e8d0f16c2237fb7")
    .then(response => response.json())
    .then(info => {
        getWeatherInfo(info.ip)
    })
}

function getWeatherInfo(para = "riyadh"){
    toggleLoading(true)

    fetch(`https://api.weatherstack.com/current?access_key=013db86b04aa1a24797ba2db26eea2e6&query=${para}`)
    .then(response => response.json())
    .then(data => {
        weather_container.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <i class="fa-solid fa-location-dot fs-4"></i>
                    <h2 class="d-inline-block ms-2">${data.location.country},</h2>
                    <h2 class="d-inline-block ms-2">${data.location.name}</h2>
                </div>
                <div>
                    <h2 class="text-capitalize">${data.current.weather_descriptions[0]}</h2>
                </div>
            </div>
            <div class="mt-5 d-flex align-items-center justify-content-between">
                <h1 class="degree">${data.current.temperature}°c</h1>
                <img src="${data.current.weather_icons[0]}" style="width: 100px;">
            </div>
            <div class="mt-5 d-flex align-items-center justify-content-between column-gap-4">
                <div class="weather-item d-flex align-items-center justify-content-between rounded-pill w-100">
                    <i class="fa-solid fa-cloud-showers-heavy fa-2x"></i>
                    <h2>${data.current.precip}%</h2>
                </div>
                    
                <div class="weather-item d-flex align-items-center justify-content-between rounded-pill w-100">
                    <i class="fa-solid fa-water fa-2x"></i>
                    <h2>${data.current.humidity}%</h2>
                </div>
                <div class="weather-item d-flex align-items-center justify-content-between rounded-pill w-100">
                    <i class="fa-solid fa-wind fa-2x"></i>
                    <h2>${data.current.wind_speed}%</h2>
                </div>
            </div>
        `
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        toggleLoading(false)
    })
}

function toggleLoading(isLoading) {
    if (isLoading) {
        weather_container.classList.add("before", "after");
    } else {
        weather_container.classList.remove("before", "after");
    }
}

btn_search.addEventListener("click", () =>  {
    const input_search_value = document.getElementById("input_search").value;
    toggleLoading(true)
    getWeatherInfo(input_search_value)
})


