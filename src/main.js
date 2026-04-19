import './style.css';

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card') ;
const apiKey = "7c6ca7e2d60dbd4d9292a3b29a231744"; //openweathermap api key

weatherForm.addEventListener("submit", async event =>{
  event.preventDefault();//disable page refresh on form submission
  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch (error) {
      console.error(error);
      displayError(error);
    }
  }
  else {
    displayError("Please enter a city");
  }

});


async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  // console.log(response);
  
  if(!response.ok){
    throw new Error("Could not fetch data for the city");
  }

  return await response.json();
  
}

function displayWeatherInfo(data){
  // console.log(data);
  const { name: city, 
          main: { temp, humidity }, 
          weather: [{ description, id: weatherId }] } = data;  //destructure the data object
  console.log(city, temp, humidity, description, weatherId);

    card.textContent = ""; //removing any old content (both text and child elements) in the Weather card
    card.style.display = "flex"; //displaying the Weather card now

    //creating elements to display weather info in the Weather card
    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    cityDisplay.classList.add('cityDisplay');
    card.appendChild(cityDisplay);
    
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)} °C`;  //converting kelvin to celsius
    tempDisplay.classList.add('tempDisplay');
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add('humidityDisplay');
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description;
    descDisplay.classList.add('descDisplay');
    card.appendChild(descDisplay);

    weatherEmoji.textContent = getWeatherEmoji(weatherId);
    weatherEmoji.classList.add('weatherEmoji');
    card.appendChild(weatherEmoji);

  

}

function getWeatherEmoji(weatherId){
  switch(true){
    case (weatherId>=200 && weatherId<300): return "⛈️";
    case (weatherId>=300 && weatherId<400): return "🌧️";
    case (weatherId>=500 && weatherId<600): return "🌧️";
    case (weatherId>=600 && weatherId<700): return "❄️";
    case (weatherId>=700 && weatherId<800): return "😶‍🌫️";
    case (weatherId ===800): return "🌞";
    case (weatherId >800 && weatherId < 810): return "☁️";
    default: return "❓";
  }

}

function displayError(msg){
  const errorDisplay = document.createElement('p');
  errorDisplay.textContent = msg;
  errorDisplay.classList.add('errorDisplay');

  card.textContent = ""; //removing any old content (both text and child elements) in the Weather card
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}

