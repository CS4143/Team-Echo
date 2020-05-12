const db = require('../../Config/database');

class AssignmentDBA 
{
    async getCourseAssignments(email, course_number){
        return await db.query("CALL GetCourseAssignments (:email, :course_number)", 
            {replacements: {email: email, course_number: course_number}},
            {raw: true}
        );
    };
}

module.exports = AssignmentDBA;