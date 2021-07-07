const weatherContainer = document.querySelector(".header__weather");

const API_KEY = "0658c70a031f4accbbf1599a34aeb1f6";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
  //URL을 부름. network창을 눌러보고 확인.
  //내용을 추출해서 data를 얻음.
    //fetch가 작동하는 방법은 간단하진 않음.
    //fetch는 promise. : 당장 일어나지 않고 시간이 좀 걸린뒤에 일어남
    //서버에 물어보고, 응답하는 시간을 기다려야함.
    //그래서 .then()을 이용함.
    //URL을 fetch하고 그 다음으로 response를 받아야 함. 
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
      weatherContainer.innerHTML = `<span class="location">${city}</span>
      <span class="temp-weather">${temp}°C <i class="${iconClass}"></i></span>`
})

}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

//getCurrentPosition 인수2개 필요(실행될함수, 에러가발생했을때 실행될함수)
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);