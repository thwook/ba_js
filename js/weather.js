/*
//openweathermap.org
const API_KEY = "0658c70a031f4accbbf1599a34aeb1f6";
const POSITION_LS = "position";

//POSITION_LS라는 KEY로 value(JSON.stringfy(obj))를 저장함.
function savePosition(obj){
    localStorage.setItem(POSITION_LS, JSON.stringify(obj));
}

//getCurrentPosition 인수2개 필요(실행될함수, 에러가발생했을때 실행될함수)
function getPosition(){
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)
}

//js가 user의 위치전달
function onGeoOk(position){
    console.log(position); //위도 경도
    const lat = position.coords.latitude; // 위도얻기
    const lon = position.coords.longitude; // 경도얻기
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    //fetch가 작동하는 방법은 간단하진 않음.
    //fetch는 promise. : 당장 일어나지 않고 시간이 좀 걸린뒤에 일어남
    //서버에 물어보고, 응답하는 시간을 기다려야함.
    //그래서 .then()을 이용함.
    //URL을 fetch하고 그 다음으로 response를 받아야 함. 
    fetch(url).then(response => response.json()).then(data => {
        const weatherContainer = document.querySelector(".header__weather");
        const city = data.name;
        const temp = data.main.temp;
        const weather = data.weather[0].main;
        console.log(data);
        let iconClass = undefined;
        switch (weather) {
            case "Mist":
            case "Rain":
                iconClass = "fas fa-cloud-rain";
                break;
            case "Clear":
            case "Sunny":
                break;
            case "Cloud":
                iconClass = "fas fa-cloud";
                break;
            case "Snowy":
                iconClass = "far fa-snowflake";
                break;
            default:
                throw new Error(`put wrong weather`);
        }
        weatherContainer.innerHTML = `<span class="location">${city}</span>
        <span class="temp-weather">${temp}ºC <i class="${iconclass}"></i><span>`
    }); //url을 부름


//위치를 찾지못했을 때 실행.
function onGeoError(){
    alert("위치를 찾을 수 없습니다.");
}

function getWeather(lat, lon) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
}
/*
const Position = localStorage.getItem(POSITION_LS);
const parsedPosition = JSON.parse(Position);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //weatherContainer는 span에서 날씨를 주기위해
        //getElementById 대신 querySelector사용.
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
    });  */
    //URL을 부름. network창을 눌러보고 확인.
    //내용을 추출해서 data를 얻음.




//getCurrentPosition 인수2개 필요(실행될함수, 에러가발생했을때 실행될함수)
//navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError); 

const weatherContainer = document.querySelector(".header__weather");

const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const city = data.name;
      const temp = data.main.temp;
      const weather = data.weather[0].main;
      let iconClass = undefined;
      switch (weather) {
        case "Mist":
        case "Rain":
            iconClass = "fas fa-cloud-rain";
            break;
        case "Clear":
        case "Sunny":
            iconClass = "far fa-sun";
            break;
        case "Clouds":
            iconClass = "fas fa-cloud";
            break;
        case "Snowy":
            iconClass = "far fa-snowflake";
            break;
        default:
            throw new Error(`Put wrong weather`);
    }
      weatherContainer.innerText = `<span class="location">${city}</span>
      <span class="temp-weather">${temp}°C <i class="${iconClass}"></i></span>`
})

}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);