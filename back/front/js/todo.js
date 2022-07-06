// 일정 조회
readTodo();

async function readTodo(){
    // 토큰이 없으면 return
    const token = localStorage.getItem("x-access-token");
    if(!token){
        return;
    };

    // 일정 조회 API 호출하기
    const config = {
        method:"get",
        url: url +"/todos",
        headers: {"x-access-token":token}
    }
    try {
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }

        const todoDataSet = res.data.result;
        for(let section in todoDataSet){
            // 각 섹션에 해당하는 테그 선택
            const sectionUl = document.querySelector( `#${section} ul` )
            // 각 섹선에 해당하는 데이터
            const arrayForEachSection = todoDataSet[section];

            let result = "";
            for(let todo of arrayForEachSection){
                let elememt = `
                    <li class="list_item" id=${todo.todoIdx}>
                        <div class="done_text_container">
                            <input type="checkbox" class="todo_tone" 
                                ${
                                    todo.status === 'C'
                                    ? "checked" 
                                    : ""
                                }>
                            <p class="todo_text">${todo.contents}</p>
                        </div>
                        <!-- done_text_container -->
                        <div class="update_delete_container">
                        <i class="todo_update fa-solid fa-pencil"></i>
                        <i class="todo_delete fa-solid fa-trash-can"></i>
                        </div>
                    </li>
                `;
                result += elememt;
            }
            sectionUl.innerHTML = result;
        }
    } catch (err) {
        console.error(err);
    }
}

// 일정 CUD
const matrixContainer = document.querySelector('.matrix_container');
matrixContainer.addEventListener("keypress",cudController);
matrixContainer.addEventListener("click",cudController);

function cudController(event){
    const token = localStorage.getItem("x-access-token");
    if(!token){
        return;
    }
    const target = event.target;
    const targetTagName = target.tagName;
    const eventType = event.type;
    const key = event.key;

    // create 이벤트 처리
    if(targetTagName === "INPUT" && key === "Enter"){
        createTodo(event, token);
        return;
    }
    // update 이벤트 처리
    
    // 체크 박스
    if(target.className === "todo_tone" && eventType === "click"){
        updateTodoDone(event, token);
        return;
    }
    // 컨텐츠 업데이트
    const firstClassName = target.className.split(" ")[0];
    console.log(target);
    if(firstClassName === "todo_update" && eventType === "click"){
        updateTodoContents(event, token);
        return;
    }

    // delete 이벤트 처리
    if(firstClassName === "todo_delete" && eventType === "click"){
        deleteTodo(event, token);
        return;
    }


}

async function createTodo(event, token){
    const contents = event.target.value;
    const type = event.target.closest(".matrix_item").id;
    console.log(contents);
    console.log(type);
    if(!contents){
        alert("내용을 입력해 주세요");
        return false;
    }

    const config = {
        method: "post",
        url: url + "/todo",
        headers: {"x-access-token": token},
        data: {
            contents: contents, 
            type: type
        },
    }

    try {
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        event.target.value = "";
        location.reload();
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function updateTodoDone(event, token){
    const status = event.target.checked ? 'C' : 'A';
    const todoIdx = event.target.closest(".list_item").id;

    const config = {
        method: "patch",
        url: url + "/todo",
        headers: {"x-access-token": token},
        data: {
            todoIdx: todoIdx, 
            status: status
        },
    }

    try {
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        event.target.value = "";
        location.reload();
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function updateTodoContents(event, token){
    const contents = prompt("내용을 입력해 주세요.");
    const todoIdx = event.target.closest(".list_item").id;

    const config = {
        method: "patch",
        url: url + "/todo",
        headers: {"x-access-token": token},
        data: {
            todoIdx: todoIdx, 
            contents: contents
        },
    }

    try {
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        event.target.value = "";
        location.reload();
    } catch (err) {
        console.error(err);
        return false;
    }
}

async function deleteTodo(event, token){
    const todoIdx = event.target.closest(".list_item").id;
    const isVaildReq = confirm("삭제하시겠습니까?");
    if(!isVaildReq){
        return false;
    }
    const config = {
        method: "delete",
        url: url + "/todo/"+ todoIdx,
        headers: {"x-access-token": token},
    }

    try {
        const res = await axios(config);
        if(res.data.code !== 200){
            alert(res.data.message);
            return false;
        }

        // DOM 업데이트
        readTodo();
        location.reload();
    } catch (err) {
        console.error(err);
        return false;
    }
}
