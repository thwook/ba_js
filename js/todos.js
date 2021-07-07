const pendingBtn = document.querySelector(".pending-btn");
const finishedBtn = document.querySelector(".finished-btn");
const pendingContainer=document.querySelector(".pending-container")
const finishedContainer=document.querySelector(".finished-container")

const todoForm = document.querySelector(".todo__form");
const todoInput = document.querySelector(".todo__input");
const pendingList = document.querySelector(".pending-list");
const finishedList = document.querySelector(".finished-list");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";
let PENDING_TODOS = [];
let FINISHED_TODOS = [];
//
let clickedPending = false;
let clickedFinsihed = false;

function onClickPendingBtn() {
    //버튼을 눌렀을 때.
    if (!clickedPending) {
        showPending();
        clickedPending = true;
    //누르지 않았을 때.
    } else {
        hidePending();
        clickedPending = false;
    }
}

function onClickFinishedBtn() {
    if (!clickedFinsihed) {
        showFinished();
        clickedFinsihed = true;
    } else {
        hideFinished();
        clickedFinsihed = false;
    }
}

//버튼 클릭 opacity 투명도.
function showPending() {
    pendingContainer.style.opacity = `1`;
}

function hidePending() {
    pendingContainer.style.opacity = `0`;
}

function showFinished() {
    finishedContainer.style.opacity = `1`;
}

function hideFinished() {
    finishedContainer.style.opacity = `0`;
}

function onSubmit(event) {
    event.preventDefault(); //기본동작막음.
    const currentTodo = todoInput.value;
    showPendingTodo(currentTodo);
    todoInput.value = '';
}

function showPendingTodo(text) {
    const id = PENDING_TODOS.length+1;
    const todo = makePendingTodo(text,id);
    todo.setAttribute("class", "todo-item pending-item");
    todo.id = id;
    pendingList.appendChild(todo); //list에 todo를 놓는것.
    //appendChild()는 보통 어떠한 노드에 자식 객체를 추가하기 위해 사용.
    const todoObj = {
        id,
        text,
    }
    PENDING_TODOS.push(todoObj);
    savePendingTodo(todoObj);
}

function showFinishedTodo(text) {
    const id = FINISHED_TODOS.length+1;
    const todo = makeFinishedTodo(text,id);
    todo.setAttribute("class", "todo-item finished-item");
    todo.id = id;
    finishedList.appendChild(todo);
    const todoObj = {
        id,
        text,
    }
    FINISHED_TODOS.push(todoObj);
    saveFinishedTodo(todoObj);
}

function makePendingTodo(text,id) {
    const li = document.createElement("li");
    li.innerHTML =
        `<span class="todo-text">${text}</span>
        <div class="todo-btns">
            <button class="todo-list-btn todo-del-btn" data-item="delete" data-id="${id}">x</button>
            <button class="todo-list-btn todo-finished-btn"><i class="far fa-thumbs-up todo-finished-btn" data-item="finished" data-id="${id}"></i></button>
        </div>`
    return li;
}

function makeFinishedTodo(text,id) {
    const li = document.createElement("li");
    li.innerHTML =
        `<span class="todo-text">${text}</span>
        <div class="todo-btns">
            <button class="todo-list-btn todo-back-btn"><i class="fas fa-arrow-left" data-item="back" data-id="${id}"></i></button>
            <button class="todo-list-btn todo-del-btn" data-item="delete" data-id="${id}">x</button>
        </div>`
    return li;
}

//setItem("key", "value") : 해당 key로 value를 저장한다.
//removeItem("key") : 저장된 key/value가 삭제된다.
//clear() : 전체 localStorage 데이터 삭제
function savePendingTodo() {
    localStorage.setItem(PENDING_LS, JSON.stringify(PENDING_TODOS));
}

function saveFinishedTodo() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(FINISHED_TODOS));
}

function onClickPending(event) {
    const target = event.target;
    const dataset = target.dataset;
    const item = dataset.item;
    const id = dataset.id;
    if (item === undefined) {
        return;
    } else if (item==="delete") {
        const li = document.querySelector(`.pending-item[id="${id}"]`);
        const filterd = PENDING_TODOS.filter(todo => {
            return todo.id !== parseInt(id);
        });
        console.log(filterd);
        PENDING_TODOS = filterd;
        savePendingTodo();
        li.remove();
    } else {
        const li = document.querySelector(`.pending-item[id="${id}"]`);
        const text = document.querySelector(`.pending-item[id="${id}"] span`).innerText;
        showFinishedTodo(text)
        const filterd = PENDING_TODOS.filter(todo => {
            return todo.id !== parseInt(id);
        });
        PENDING_TODOS = filterd;
        savePendingTodo();
        li.remove();
    }
}

function onClickFinished(event) {
    const target = event.target;
    const dataset = target.dataset;
    const item = dataset.item;
    const id = dataset.id;
    console.log(item);
    if (item === undefined) {
        return;
    } else if (item==="delete") {
        const li = document.querySelector(`.finished-item[id="${id}"]`);
        const filterd = FINISHED_TODOS.filter(todo => {
            return todo.id !== parseInt(id);
        });
        console.log(filterd);
        FINISHED_TODOS = filterd;
        saveFinishedTodo();
        li.remove();
    } else {
        const li = document.querySelector(`.finished-item[id="${id}"]`);
        const text = document.querySelector(`.finished-item[id="${id}"] span`).innerText;
        console.log(text);
        showPendingTodo(text)
        const filterd = FINISHED_TODOS.filter(todo => {
            return todo.id !== parseInt(id);
        });
        FINISHED_TODOS = filterd;
        saveFinishedTodo();
        li.remove();
    }
}

//pending button을 눌렀을 때.
pendingBtn.addEventListener("click", onClickPendingBtn);

//finished button을 눌렀을 때.
finishedBtn.addEventListener("click", onClickFinishedBtn);

//const PENDING_LS = "pending";
//const FINISHED_LS = "finished";

// getItem("key") : 저장된 value값을 key로 가져온다.
const loadedPending = localStorage.getItem(PENDING_LS);
const loadedFinished = localStorage.getItem(FINISHED_LS);

// loadedpending OR loadedFinished 둘 중 하나라도 값이 있을 때
if (loadedPending !== null||loadedFinished!==null) {
    // JSON.parse("") : obj로 바꿔준다.
    const parsedPending = JSON.parse(loadedPending);
    const parsedFinished = JSON.parse(loadedFinished);
    
    /*PENDING_TODOS = parsedPending;
    FINISHED_TODOS = parsedFinished;

    parsedPending.forEach(showPendingTodo);
    parsedFinished.forEach(showFinishedTodo); */
    
    /* 모르겠슴 */
    parsedPending&&parsedPending.forEach(todo => showPendingTodo(todo.text))
    parsedFinished&&parsedFinished.forEach(todo => showFinishedTodo(todo.text))
};

/*
const savedtoDos = localStorage.getItem(TODOS_KEY);
//savedtoDos가 localStrage에 존재하면
if(savedtoDos !== null){
    const parsedToDos = JSON.parse(savedtoDos);
    toDos = parsedToDos; //이전 toDos array 복원.
    parsedToDos.forEach(paintToDo); //forEach가 실행되면 paintToDo를 부름.
    //forEach함수는 이 paintToDo를 parsedToDos 배열의 요소마다 실행.
    //parsedToDos.forEach((item) => console.log("this is the ... off", item));
    //forEach는 function을 실행해줌.    
}  */

/* <form class = "todo__form"> 
        <input class = "todo__input"/> 
    </form> */
todoForm.addEventListener("submit", onSubmit);
/* <ul class = "todo-list pending-list"> */
pendingList.addEventListener("click", onClickPending);
finishedList.addEventListener("click",onClickFinished)

