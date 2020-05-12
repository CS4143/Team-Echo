const express = require("../node_modules/express");
const app = express();
const bodyParser = require('body-parser');
const usersRoutes = require("./Routes/SharedController/users");
const studentsRoutes = require("./Routes/StudentController/students");
const teacherRoutes = require('./Routes/TeacherController/teachers');
const onlineCodeRoutes = require('./Routes/OnlineCodeCompilerController/onlineCode');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use("/users", usersRoutes); 
app.use("/student", studentsRoutes);
app.use("/teacher", teacherRoutes);
app.use("/onlineCode", onlineCodeRoutes);

module.exports = app;