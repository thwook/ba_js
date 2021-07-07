//시간부분.
const clock = document.querySelector(".header__time");

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0") ;
    const minutes = String(date.getMinutes()).padStart(2, "0") ;
    const seconds = String(date.getSeconds()).padStart(2, "0") ;
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}


getClock(); //즉시호출해주기 위해 작성 (setInterval의 경우 1초뒤에 실행되므로)
setInterval(getClock, 1000); //1초마다 갱신. 코드삭제시 당시의 시간만 출력됨.


