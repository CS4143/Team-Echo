const express = require("express");
const router = express.Router();
const UsersLogic = require('../../BLL/UsersLogic');

/*
    Basic Login in functionality
*/
router.post('/login', (req, res, next) => {
    let CurrentUser = new UsersLogic();
    console.log(req.body)
    const {email, password} = req.body;
    CurrentUser.verifyUser(email, password)
    .then((result) => {
        if (result.length > 0){
            console.log(result) // use `/${result[1]}`
            if (result[1] === "Teacher"){
                res.redirect('/teacher');
            }
            else{
                res.status(200).send('student');
            }
        }
        else{
            res.send("Invalid");
        }
    });
});

module.exports = router;