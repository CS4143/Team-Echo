const StudentDBA = require('../BDA/StudentsService')

class StudentLogic
{
    getGrades(email){
        let CurrentStudentDBA = new StudentDBA();
        return CurrentStudentDBA.getGrades(email).then((grades) => {
            return grades;
        }).catch((err) => {
            console.log(err);
        });
    };

    getCourseGrades(email, course){
        let CurrentStudentDBA = new StudentDBA();
        return CurrentStudentDBA.getCourseGrades(email, course).then((grades) => {
            return grades;
        }).catch((err) => {
            console.log(err);
        });
    };
}

module.exports = StudentLogic;