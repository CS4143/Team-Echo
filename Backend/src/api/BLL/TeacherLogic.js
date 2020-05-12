const UsersDBA = require('../BDA/UsersService');
const TeacherDBA = require('../BDA/TeacherService');
const ContentDBA = require("../BDA/ContentsService");
const bcrypt = require('../../node_modules/bcrypt');

class TeacherLogic
{
    createStudentOrProctor(studentEmail, isProctor, password, role){
        return bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.log(err);
            }
            else {
                let NewUsersDBA = new TeacherDBA();
                let studentName = studentEmail.split('@')[0];
                return NewUsersDBA.createStudentOrProctor(studentEmail, isProctor, studentName, hashedPassword, role);
            };
        });
    };

    getStudents(email, course_number){
        let CurrentStudentsDBA = new TeacherDBA();
        return CurrentStudentsDBA.getStudents(email, course_number);
    };

    getStudent(email, course_number, userid){
        let CurrentStudentsDBA = new TeacherDBA();
        return CurrentStudentsDBA.getStudent(email, course_number, userid);
    };

    deleteStudent(email, course_number, userid){
        let OldUserDBA = new TeacherDBA();
        return OldUserDBA.deleteStudent(email, course_number, userid);
    };

    studentExist(email){
        let ExistingStudentDBA = new UsersDBA();
        return ExistingStudentDBA.userExist(email).then((result) => {
            if (result.length > 0){
                return true;
            }
            return false;
        });
    };

    verifyFields(emailExist, password, confirmedPassword, role){
        let errors = [];

        emailExist ? errors.push({emailMsg: "Email already in use."}) : 
            null;
        //role === "Teacher" ? errors.push({roleMsg: "Please contant Administator to create a Teacher."}) : 
          //  null;
        password === confirmedPassword ? null : 
            errors.push({pwdMsg: "Passwords do not match"});
        (password.length > 5 && password.length < 10) ? null : 
            errors.push({pwdLenMsg: "Password must be between 6 - 10 characters"});
        //!(role === "Student" || role === "Proctor") ? errors.push({invalidRoleMsg: "This is not a valid role."}) : null;
           
        if (role === "Teacher"){
            errors.push({roleMsg: "Please contant Administator to create a Teacher."}) 
        }
        else if (!(role === "Student" || role === "Proctor")){
            errors.push({invalidRoleMsg: "This is not a valid role."})
        }

        return errors;
    };
}


module.exports = TeacherLogic;