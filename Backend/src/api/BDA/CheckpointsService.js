const db = require('../../Config/database');

class CheckpointsDBA 
{
    async getCourseInlabs(email, course_number){
        return await db.query("CALL GetCourseInLabs (:email, :course_number)", 
            {replacements: {email: email, course_number: course_number}},
            {raw: true}
        );
    };

    async getInLabCheckpoints(email, course_number, inlab){
        return await db.query("CALL GetInLabCheckpoints (:email, :course_number, :inlab)", 
            {replacements: {email: email, course_number: course_number, inlab: inlab}},
            {raw: true}
        );
    };

    async updateInLabCheckpoints(email, course_number, inlab, checkpointid){
        return await db.query("CALL UpdateInLabCheckpoints (:email, :course_number, :inlab, :checkpointid)", 
            {replacements: {email: email, course_number: course_number, inlab: inlab, checkpointid: checkpointid}},
            {raw: true}
        );
    };
}

module.exports = CheckpointsDBA;