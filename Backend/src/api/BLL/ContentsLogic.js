const ContentsDBA = require('../BDA/ContentsService');

class ContentsLogic
{   
    getUserContents(email, content_type){
        let ExistingUserDBA = new ContentsDBA();
        if (content_type === 'Announcement'){
            return ExistingUserDBA.getUserContents(email, content_type);
        }
        else if (content_type === 'Note'){
            return ExistingUserDBA.getUserContents(email, content_type);
        };
    };

    getCourseContent(email, course_number, content_type){
        let CurrentTeacherDBA = new ContentsDBA;
        if (content_type === 'Announcement'){
            return CurrentTeacherDBA.getCourseContent(email, course_number, "Announcement");
        }
        else if (content_type === 'Note'){
            return CurrentTeacherDBA.getCourseContent(email, course_number, "Note");
        }   
    }

    getSpecificCourseContent(email, content_type, course_number, content_id){
        let ExistingUserDBA = new ContentsDBA();
        if (content_type === 'Announcement'){
            return ExistingUserDBA.getSpecificCourseContent(email, content_type, course_number, content_id);
        }
        else if (content_type === 'Note'){
            return ExistingUserDBA.getSpecificCourseContent(email, content_type, course_number, content_id);
        };
    }
}

module.exports = ContentsLogic;