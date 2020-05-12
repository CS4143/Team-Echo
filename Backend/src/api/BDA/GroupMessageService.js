const db = require('../../Config/database');

class GroupMessageDBA
{
    async getGroups(email){
        return await db.query("CALL GetUserGroups (:email)", 
            {replacements: { email: email }},
            {raw: true}
        );
    };  

    async getGroup(email, group_number){
        return await db.query("CALL GetUserGroup (:email, :group_number)", 
            {replacements: { email: email, group_number}},
            {raw: true}
        );
    };

    async getGroupMessages(email, group_number){
        return await db.query("CALL GetGroupMessages (:email, :group_number)", 
            {replacements: { email: email, group_number}},
            {raw: true}
        );
    };

    async getMessages(){
        return await db.query("CALL GetGroupMessages (:email)", 
            {replacements: { email: email }},
            {raw: true}
        );
    };

    async getMessage (messageid){
        return await db.query("CALL GetMessage (:email, :course_number, :content_type)", 
            {replacements: { email: email, course_number: course_number, content_type: content_type }},
            {raw: true}
        );
    };

    async newMessage(email, message, group_number){
        return await db.query("CALL NewMessage (:email, :message, :group_number)",
            {replacements: { email: email, message: message, group_number: group_number }},
            {raw: true}
        );
    }

    async editedMessage(email, message, group_number, message_id){
        return await db.query("CALL EditedMessage (:email, :message, :group_number, :message_id)",
            {replacements: { email: email, message: message, group_number: group_number, message_id: message_id }},
            {raw: true}
        );
    }
}

module.exports = GroupMessageDBA;