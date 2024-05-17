const TaskRouter = require("express").Router();

TaskRouter.get("/", (req, res, next) => {
    res.json({
        success: true,
        message: "task fetched from TaskController successfully"
    })

})

TaskRouter.post("/create", (req, res, next) => {
    console.log(req.body);
    res.json({
        success: true,
        message: "task created from TaskController successfully"
    })

})

module.exports = TaskRouter;