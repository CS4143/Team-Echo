const db = require('../../Config/database');

class StudentDBA
{
    async getGrades(email){
        return await db.query("CALL GetGrades (:email)",
            {replacements: { email: email}}
        );
    };

    async getCourseGrades(email, course){
        return await db.query("CALL GetCourseGrades (:email, :course)",
            {replacements: { email: email, course: course }}
        );
    };
}

module.exports = StudentDBA;