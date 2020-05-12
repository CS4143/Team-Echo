const db = require('../../Config/database');

class TeacherDBA
{
    async getStudents(email, course_number){
        return await db.query("CALL GetStudents (:email, :course_number)",
            {replacements: { email: email, course_number: course_number }}
        );
    };

    async getStudent(email, course_number, userid){
        return await db.query("CALL GetStudent (:email, :course_number, :userid)",
            {replacements: { email: email, course_number: course_number, userid: userid }}
        );
    };

    async createStudentOrProctor(studentEmail, isProctor, studentName, password, role){
        return await db.query("CALL NewStudentOrProctor (:proctor, :studentEmail, :password, :role, :studentName)",
            {replacements: { proctor: isProctor,
                             studentEmail: studentEmail, password: password, role: role,
                             studentName: studentName}}
        );
    };

    async deleteStudent(email, course_number, userid){
        return await db.query("CALL DeleteStudent (:email, :course_number, :userid)",
            {replacements: { email: email, course_number: course_number, userid: userid }}
        );
    };

}

module.exports = TeacherDBA;