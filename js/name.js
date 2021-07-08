'use strict';

const nameForm = document.querySelector(".name-form");
const nameInput = document.querySelector(".name-input");
//spanClass = nameContainer
const nameSpan = document.querySelector(".name");
const USER_LS = "username"; //KEY값 user

function onSubmit(event) { //enter
    event.preventDefault(); //기본동작을 막는다.
    nameForm.classList.add("name-hide"); //css로 none상태가 됨.
    const currentValue = nameInput.value; //value를 currentname이라는 변수로 저장.
    localStorage.setItem(USER_LS, currentValue); //currentValue값을 USER_LS이라는 key와 함꼐 local storage에 저장.
    //두가지 규칙이 있다.
    // 변수를 strig안에 집어넣을거면 ${변수명} 표현.
    showName(currentValue);
}

function showName(text) {
    nameSpan.classList.remove("name-hide");
    nameSpan.innerHTML = `😃 Hello ${text}`;
}

//첫단계 자바스크립트가 local strage 확인하는것. (불러오는 것)
const userName = localStorage.getItem(USER_LS);

//입력된것이 없다면
if (userName === null) {
    nameForm.classList.remove("name-hide");
    nameForm.addEventListener("submit", onSubmit);
} else { //있을 때
    showName(userName);
}



