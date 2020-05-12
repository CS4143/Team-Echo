const AssignmentDBA = require('../BDA/AssignmentsService');

class AssignmentsLogic
{
    getCourseAssignments(email, course_number){
        let Assignments = new AssignmentDBA();
        return Assignments.getCourseAssignments(email, course_number);
    }
}

module.exports = AssignmentsLogic;