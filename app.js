const h1 = document.querySelector(".hello h1");

h1.innerText = "click!";


function handleTitleClick() {
    const clickedClass = "clicked";
    if (h1.className === "clickedClass") {
        h1.className = "";
    } else {
        h1.className = "clickedClass";
    }
    console.log(h1.className);
}

//유저가 title을 클릭할 경우 자바스크립트가 
//실행버튼을 대신 눌러주는 

//h1.onclick = handleTitleClick;
h1.addEventListener("click", handleTitleClick);
