const sceneContent = document.querySelector(".scene__content");
const sceneSlider = document.querySelector(".scene__slider");
const illustContent = document.querySelector(".illust__content");
const illustSlider = document.querySelector(".illust__slider");

const sceneBtns = document.querySelector(".scene__btns");
const sceneBtn = document.querySelectorAll(".scene__btn");
const illustBtns = document.querySelector(".illust__btns");
const illustBtn = document.querySelectorAll(".illust__btn");

let AMOUNT_SCENE = 0;
let AMOUNT_ILLUST = 0;

//div class="scene__content"를 클릭하면 
sceneContent.addEventListener("click", onClickScene);
sceneBtns.addEventListener("change", onChangeSceneBtns);
illustContent.addEventListener("click", onClickIllust);
illustBtns.addEventListener("change", onChangeIllustBtns);

function onClickScene(event) {
    const target = event.target; //이벤트가 발생한 요소를 반환
    const dataset = target.dataset; //html에서 사용한 data-값들을 읽어냄 data-value= "first" "second" "third"
    const id = dataset.id; //data-id = "left-btn", "right-btn"
    if (id === undefined) {
        return;
    } else if (id === "right-btn") {
        //100씩 움직임.
        AMOUNT_SCENE -= 100;
        if (AMOUNT_SCENE < -200) {
            AMOUNT_SCENE = -200;
        }
        //setAttribute(속성이름, 속성값)
        //style의 속성에 속성값을 넣는것
        sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
        //넘기는것에 맞춰 동그라미버튼움직이기
        switch (AMOUNT_SCENE) {
            case 0:
                sceneBtn.forEach(btn=>btn.checked=false);
                sceneBtn[0].checked=true;;
                break;
            case -100:
                sceneBtn.forEach(btn=>btn.checked=false);
                sceneBtn[1].checked=true;;
                break;
            case -200:
                sceneBtn.forEach(btn=>btn.checked=false);
                sceneBtn[2].checked=true;;
                break;
    
        }
    } else {
        AMOUNT_SCENE += 100;
        if (AMOUNT_SCENE > 0) {
            AMOUNT_SCENE = 0;
        }
        sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`)
        switch (AMOUNT_SCENE) {
            case 0:
                sceneBtn.forEach(btn => btn.checked=false);
                sceneBtn[0].checked=true;
                break;
            case -100:
                sceneBtn.forEach(btn => btn.checked=false);
                sceneBtn[1].checked=true;
                break;
            case -200:
                sceneBtn.forEach(btn => btn.checked=false);
                sceneBtn[2].checked=true;
                break;

        }
    }
}

//넘기는것에 맞춰 단추도 움직
function onClickIllust(event) {
    const target = event.target;
    const dataset = target.dataset;
    const id = dataset.id;
    if (id === undefined) {
        return;
    } else if (id === "right-btn") {
        AMOUNT_ILLUST -= 100;
        if (AMOUNT_ILLUST < -100) {
            AMOUNT_ILLUST = -100;
        }
        console.log(AMOUNT_ILLUST);
        illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`);
        switch (AMOUNT_ILLUST) {
            //오른쪽으로 넘길때
            case 0:
                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[0].checked = true;
                break;
            case -100:
                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[1].checked=true;
                break;
          
        }
    } else {
        //왼쪽으로 넘길때
        AMOUNT_ILLUST += 100;
        if (AMOUNT_ILLUST > 0) {
            AMOUNT_ILLUST = 0;
        }
        console.log(AMOUNT_ILLUST);
        illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`)
        switch (AMOUNT_ILLUST) {
            case 0:
                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[0].checked=true;
                break;
            case -100:
                illustBtn.forEach(btn => btn.checked=false);
                illustBtn[1].checked=true;
                break;

        }
    }
}

//단추버튼 
function onChangeSceneBtns(event) {
    const dataset = event.target.dataset;
    const value = dataset.value;
    if (value === undefined) {
        return;
    } 
    switch (value) {
        case "first":
            AMOUNT_SCENE = 0;
            sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
            break;
        case "second":
            AMOUNT_SCENE = -100;
            sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
            break;
        case "third":
            AMOUNT_SCENE = -200;
            sceneSlider.setAttribute("style", `transform: translateX(${AMOUNT_SCENE}%)`);
            break;
        
        default:
            throw error(`You clicked wrong button`);
    }
}

//단추버튼
function onChangeIllustBtns(event) {
    const dataset = event.target.dataset;
    const value = dataset.value;
    if (value === undefined) {
        return;
    }
    switch (value) {
        case "first":
            AMOUNT_ILLUST = 0;
            illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`);
            break;
        case "second":
            AMOUNT_ILLUST = -100;
            illustSlider.setAttribute("style", `transform: translateX(${AMOUNT_ILLUST}%)`);
            break;
     
        default:
            throw error(`You clicked wrong button`);
    }
}