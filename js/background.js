/*const images = ["0.jpg", "1.jpg", "2.jpg"];

//quotes.js와 동일.
const chosenImage = images[Math.floor(Math.random() * images.length)];

//JS에서 html element를 생성함.
//밑에 3줄이 하는건 HTML에서 <img src=""/> 와 같은 기능을 함.
const bgImage = document.createElement("img");
bgImage.src = `img/${chosenImage}`;
document.body.appendChild(bgImage); //body에 html을 추가 
//append는 맨뒤에, prepend는 가장위에 오게함. */

const body = document.querySelector("body");

function handleload(image) {
  image.classList.add("bgImage");
  body.prepend(image);
}

function paintImage() {
  const image = new Image();
  image.src = `./img/0.jpg`;
  image.addEventListener("load", handleload(image));
}

paintImage();