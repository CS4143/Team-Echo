const GroupMessageDBA = require('../BDA/GroupMessageService');

class GroupMessageLogic
{
    getGroups(email){
        let GroupsDBA = new GroupMessageDBA();
        return GroupsDBA.getGroups(email);
    };

    getGroup(email, group_number){
        let GroupsDBA = new GroupMessageDBA();
        return GroupsDBA.getGroup(email, group_number);
    };

    getGroupMessages(email, group_number){
        let MessageDBA = new GroupMessageDBA();
        return MessageDBA.getGroupMessages(email, group_number);
    };

    // For teacher only, but possbily remove
    getGroupMessage(messageid) {
        let MessageDBA = new GroupMessageDBA();
        return MessageDBA.getMessage(messageid);
    };

    newMessage(email, message, group_number) {
        let MessageDBA = new GroupMessageDBA();
        return MessageDBA.newMessage(email, message, group_number);
    }

    editedMessage(email, message, group_number, message_id) {
        let MessageDBA = new GroupMessageDBA();
        return MessageDBA.editedMessage(email, message, group_number, message_id);
    }
}

module.exports = GroupMessageLogic;