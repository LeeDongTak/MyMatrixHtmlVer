const indexDao = require("../dao/indexDao");

exports.createTodo = async function(req, res){
    const { userIdx } = req.verifiedToken;
    const { contents, type } = req.body;

    if(!userIdx || !contents || !type) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "입력값이 누락되었습니다.",
        });
    }

    // contents 20 글자 초과 불가
    if(contents.length > 20) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "콘텐츠는 20글자 이하로 설정해 주세요",
        });
    }
    // type : do, decide, delete, delegate
    const validType = ["do", "decide", "delete", "delegate"];
    if(!validType.includes(type)) {
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 타입이 아닙니다. ",
        });
    }

    const insertTodoRow = await indexDao.insertTodo(userIdx, contents, type);
    
    if(!insertTodoRow) {
        return res.send({
            isSuccess: false,
            code: 403,
            message: "요청에 실패하였습니다. 관리자에게 문의하세요.",
        })
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "일정 생성 성공",
    })

};

exports.readTodo = async function(req, res){
    const { userIdx } = req.verifiedToken;

    let todos = {};
    const types = ["do", "decide", "delete", "delegate"];
    for(let type of types){
        const selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type);
        if(!selectTodoByTypeRows){
            return res.send({
                isSuccess: false,
                code: 400,
                message: "일정 조회 실패 관리자에게 문의하세요",
            });
        }


        todos[type] = selectTodoByTypeRows;
    }

    
    return res.send({
        result: todos,
        isSuccess: true,
        code: 200,
        message: "일정 조회 성공",
    })
}

exports.updateTodo = async function(req, res){
    const { userIdx } = req.verifiedToken;
    let {todoIdx, contents, status} = req.body;
    if(!userIdx || !todoIdx){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "userIdx와 todoIdx를 보내주세요",
        });
    }
    if(!contents){
        contents = null;
    }
    if(!status){
        status = null;
    }
    const isValidTodoRow = await indexDao.selectValidTodo(userIdx, todoIdx);
    if(isValidTodoRow.length < 1){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 타입이 아닙니다. userIdx와 todoIdx를 확인하세요",
        });
    }

    const updateTodoRow = await indexDao.updateTodo(userIdx, todoIdx, contents, status);
    if(!updateTodoRow){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "수정 실패 관리자에게 문의하세요. ",
        });
    }
    
    return res.send({
        isSuccess: true,
        code: 200,
        message: "수정 성공",
    })
}

exports.deleteTodo = async function(req,res){
    const { userIdx } = req.verifiedToken;
    const { todoIdx } = req.params;
    if(!userIdx || !todoIdx){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "userIdx와 todoIdx를 입력해주세요",
        });
    }
    const isValidTodoRow = await indexDao.selectValidTodo(userIdx, todoIdx);
    if(isValidTodoRow.length < 1){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "유효한 타입이 아닙니다. userIdx와 todoIdx를 확인하세요",
        });
    }

    const deleteTodoRow = await indexDao.deleteTodo(userIdx, todoIdx);
    if(!deleteTodoRow){
        return res.send({
            isSuccess: false,
            code: 400,
            message: "삭제 실패 관리자에게 문의하세요. ",
        });
    }

    return res.send({
        isSuccess: true,
        code: 200,
        message: "삭제 성공",
    });
}