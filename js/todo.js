const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
// = document.querySelector("#todo-form input"); 과 같음.
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

//업데이트가 가능하도록 let으로 
let toDos = [];

function savetoDos(){
    //toDos array의 내용을 localStrage에 넣는것.
    //js object나 array 또는 어떤 코드간에 string으로 만들어줌.
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); 
}

function deleteTodo(event){ // ❌누르게 되면 event발동
    const li = event.target.parentElement; // target=button, button의 부모에게 접근 = li
    console.log(li.id);  //toDO : toDos DB에 있는요소
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    savetoDos(); //toDos DB에서 todo를 지운후에 한번 더 불러야함.
    //클릭한 li.id와 다른 toDo는 남기고싶다라는 의미.
    li.remove(); //li제거  
    //li.id는 string 타입, toDo.id는 number 타입
}

function paintToDo(newTodo){ //toDo를 그리는 역할담당. 인자:newTodo
    const li = document.createElement("li");
    li.id = newTodo.id;
     // const변수의 이름을 li로 할 필요는 없긴함. createElement는 li여야만 한다.
    const span = document.createElement("span");
    span.innerText = newTodo.text; //span의 text는 handleTodoSubmit에서 온 newTodo 텍스트가 됨. 
    const button = document.createElement("button"); //button 생성
    button.innerText = "❌"; // button의 text 삭제
    button.addEventListener("click", deleteTodo);
    li.appendChild(span); // 자식생성 : li는 span이라는 자식을 가지게 되었다.
    li.appendChild(button); //
    toDoList.appendChild(li); //list에 li를 놓는것.
    //appendChild()는 보통 어떠한 노드에 자식 객체를 추가하기 위해 사용.
}

function handleToDoSubmit(event) {
    event.preventDefault(); //submit 방지
    const newTodo = toDoInput.value; //input의 현재 value를 새로운 변수에 복사
    toDoInput.value = ""; //input창 공백설정'
    const newTodoObj = {
        text: newTodo,
        id: Date.now(), //id로 각각 li item을 구별하기 위해.
    }; 
    toDos.push(newTodoObj); //text를 array에 push하기위함 , toDos array를 가지고와서 push
    paintToDo(newTodoObj); //호출 : 화면에 newTodo 그려줌
    savetoDos(); //toDos array를 localStrage에 집어넣는것.
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedtoDos = localStorage.getItem(TODOS_KEY);
//savedtoDos가 localStrage에 존재하면
if(savedtoDos !== null){
    const parsedToDos = JSON.parse(savedtoDos);
    toDos = parsedToDos; //이전 toDos array 복원.
    parsedToDos.forEach(paintToDo); //forEach가 실행되면 paintToDo를 부름.
    //forEach함수는 이 paintToDo를 parsedToDos 배열의 요소마다 실행.
    //parsedToDos.forEach((item) => console.log("this is the ... off", item));
    //forEach는 function을 실행해줌.    
}




//localStrage는 array저장 X, text만 O

//array에서 삭제할때 실제로 array에서 그걸 지우는게 아님
//item을 빼고 새 array를 만드는 것.(지우는게 아니라 제외개념)