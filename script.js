
const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector(".searchBtn");
const result = document.querySelector("#result");
const error = document.querySelector("#error");

const apiKey = '53916936a41da74bef7210102adb4b0b';  //get api key

searchBtn.addEventListener("click", function(){
const cityName = cityInput.value; // cityname = what is put in the input.
console.log("The user entered:", cityName);

const url = (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
console.log('The url is', url)


fetch(url)
.then(response=>{

  if(response.ok){
  return response.json()
  }

  if(!response.ok){
    error.textContent = "City not found!";
    error.style.display = "block";
    result.style.display = "none"; 
    throw new Error("City not found");

  }

})

.then(data =>{

error.style.display = "none";// hide city error messages when city name is valid

  console.log(data);


const temperature = data.main.temp;
const city = data.name;
const description = data.weather[0].description;

result.textContent = `${city}: ${temperature}°C,  ${description}`; // placed  in result div..
result.style.display = "block"; //makes the result div visible on the page.

cityInput.value = "";
})

.catch(error=> console.log(error));

});