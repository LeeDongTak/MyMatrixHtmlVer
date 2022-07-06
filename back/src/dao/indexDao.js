const { pool } = require("../../database");

exports.getUserRows = async function(){
    try {
        const connection = await pool.getConnection(async (conn) =>conn);

        try {
            const selectUserQuery = "SELECT * FROM Users;";
            const [row] = await connection.query(selectUserQuery);
            return row;
        } catch (err) {
            console.log("### getUserRows Query error ###");
            return false
        }finally {
            connection.release();
        }

    } catch(err){
        console.log(err);
        return false
    }
};

exports.insertTodo = async function (userIdx, contents, type){
    try {
        // DB연결 검사
        const connection = await pool.getConnection(async (conn) =>conn);
        
        try {
            // 쿼리
            const insertTodoQuery = 
                "insert into Todos(userIdx, contents, type) value(?, ?, ?);";
            const insertTodoParams = [userIdx, contents, type];

            const [row] = await connection.query(insertTodoQuery, insertTodoParams);
            return row;
        } catch (err) {
            console.error(`### insertTodo Query error ### \n ${err}`);
            return false
        }finally {
            connection.release();
        }

    } catch(err){
        console.error(`### insertTodo Query error ### \n ${err}`);
        return false
    }
}

exports.selectTodoByType = async function(userIdx, type){
    try {
        // DB연결 검사
        const connection = await pool.getConnection(async (conn) =>conn);
        
        try {
            // 쿼리
            const selectTodoByTypeQuery = 
                "select todoIdx, contents, status from Todos where userIdx = ? and type = ? and not(status = 'D');";
            const iselectTodoByTypeParams = [userIdx, type];

            const [row] = await connection.query(selectTodoByTypeQuery, iselectTodoByTypeParams);
            return row;
        } catch (err) {
            console.error(`### selectTodoByType Query error ### \n ${err}`);
            return false
        }finally {
            connection.release();
        }

    } catch(err){
        console.error(`### selectTodoByType Query error ### \n ${err}`);
        return false
    }
}

exports.selectValidTodo = async function(userIdx, todoIdx){
    try {
        // DB연결 검사
        const connection = await pool.getConnection(async (conn) =>conn);
        
        try {
            // 쿼리
            const selectValidTodoQuery = 
                "select * from MyTodoDB.Todos where userIdx = ? and todoIdx = ? and not(status = 'D');";
            const selectValidTodoParams = [userIdx, todoIdx];

            const [row] = await connection.query(selectValidTodoQuery, selectValidTodoParams);
            return row;
        } catch (err) {
            console.error(`### selectValidTodo Query error ### \n ${err}`);
            return false
        }finally {
            connection.release();
        }

    } catch(err){
        console.error(`### selectValidTodo Query error ### \n ${err}`);
        return false
    }
}

exports.updateTodo = async function(userIdx, todoIdx, contents, status){
    try {
        // DB연결 검사
        const connection = await pool.getConnection(async (conn) =>conn);
        
        try {
            // 쿼리
            const updateTodoQuery = 
                "update MyTodoDB.Todos set contents = ifnull(?, contents), status = ifnull(?, status) where userIdx = ? and todoIdx = ?;";
            const updateTodoParams = [contents, status, userIdx, todoIdx];

            const [row] = await connection.query(updateTodoQuery, updateTodoParams);
            return row;
        } catch (err) {
            console.error(`### updateTodo Query error ### \n ${err}`);
            return false
        }finally {
            connection.release();
        }

    } catch(err){
        console.error(`### updateTodo Query error ### \n ${err}`);
        return false
    }
}

exports.deleteTodo = async function(userIdx, todoIdx){
    try {
        // DB연결 검사
        const connection = await pool.getConnection(async (conn) =>conn);
        
        try {
            // 쿼리
            const deleteTodoQuery = 
                "update MyTodoDB.Todos set status = 'D' where userIdx = ? and todoIdx = ?;";
            const deleteTodoParams = [userIdx, todoIdx];

            const [row] = await connection.query(deleteTodoQuery, deleteTodoParams);
            return row;
        } catch (err) {
            console.error(`### deleteTodo Query error ### \n ${err}`);
            return false
        }finally {
            connection.release();
        }

    } catch(err){
        console.error(`### deleteTodo Query error ### \n ${err}`);
        return false
    }
}