const { Router } = require("express");
const route = Router();

const { add,tasks,tododelete,todoUpdate} = require("../controllers/demo");

// Define the route
route.post("/add", add);
route.get("/tasks",tasks);
route.put("/todoUpdate/:id",todoUpdate);
route.delete("/tododelete/:todoId",tododelete);
// Export the Router instance
module.exports = route;
