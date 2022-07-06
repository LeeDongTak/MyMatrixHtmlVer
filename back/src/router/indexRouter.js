const indexController = require("../controller/indexController");
const { jwtMiddleware } = require("../../jwtMiddlewhare");

exports.indexRouter = function(app){
    // 일정 CRUD API
    app.post("/todo",jwtMiddleware ,indexController.createTodo); // create
    app.get("/todos",jwtMiddleware ,indexController.readTodo); // read
    app.patch("/todo",jwtMiddleware ,indexController.updateTodo); //update
    app.delete("/todo/:todoIdx",jwtMiddleware , indexController.deleteTodo); // delete
}
