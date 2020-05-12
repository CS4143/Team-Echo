const db = require('../../Config/database');

class ContentsDBA
{
    async getCourseContent(email, course_number, content_type){
        console.log(`${email} ${course_number} ${content_type}`)
        return await db.query("CALL GetCourseContent (:email, :course_number, :content_type)", 
            {replacements: { email: email, course_number: course_number, content_type: content_type }},
            {raw: true}
        );
    };

    async getSpecificCourseContent(email, content_type, course_number, content_id){
        return await db.query("CALL GetSpecificCourseContent (:email, :content_type, :course_number, :content_id)",
            {replacements: { email: email, content_type: content_type, course_number: course_number, content_id: content_id }},
            {raw: true}
        );
    };
}

module.exports = ContentsDBA;