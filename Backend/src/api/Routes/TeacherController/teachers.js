const express = require("express");
const router = express.Router();
const TeacherLogic = require('../../BLL/TeacherLogic');
const ContentsLogic = require('../../BLL/ContentsLogic');
const AssigmentLogic = require('../../BLL/AssignmentsLogic');
const GroupMessageLogic = require('../../BLL/GroupMessageLogic');
const teacherAuth = require('../../Authentication/TeacherAuth');

/*
    Teachers will have the ability to view all users, view specific user, delete specific user
*/
router.get('/', teacherAuth, (req, res, next) => {
    res.send('Teacher Page');
});

router.get('/dashboard', teacherAuth, (req, res, next) => {
    res.send('Teacher Dashboard');
});

router.post('/dashboard/createstudent', teacherAuth, (req, res, next) => { // Add teacherAuth before production
    let NewUsersLogic = new TeacherLogic();
    const {studentEmail, password, confirmedPassword, isProctor, role} = req.body;

    NewUsersLogic.studentExist(studentEmail).then((emailExist) => {
        let errors = NewUsersLogic.verifyFields(emailExist, password, confirmedPassword, role);
        if (errors.length > 0){
            res.send(Object(errors))
        }
        else{
            NewUsersLogic.createStudentOrProctor(studentEmail, isProctor, password, role);
            res.status(200).send(`${role} has been made`);
        };
    });
});

router.get('/dashboard/students/:course_number', teacherAuth, (req, res, next) => {
    let CurrentTeacherLogic = new TeacherLogic();
    const { teacher_email } = req.body; 
    const { course_number } = req.params;
    CurrentTeacherLogic.getStudents(teacher_email, course_number).then((currentUsers) => {
        currentUsers.length > 0 ? res.send(currentUsers) : res.send("No students in this course or course does not exist");
    });
});

router.get('/dashboard/students/:course_number/:userid', teacherAuth, (req, res, next) => {
    let CurrentUserLogic = new TeacherLogic();
    const { teacher_email } = req.body; 
    const { course_number, userid } = req.params;
    CurrentUserLogic.getStudent(teacher_email, course_number, userid).then((currentUser) => {
        currentUser.length > 0 ? res.send(currentUser) : res.send("Not a valid student for this course.");
    });
});

router.delete('/dashboard/students/:course_number/:userid', teacherAuth, (req, res, next) => {
    let OldUserLogic = new TeacherLogic();
    const { teacher_email } = req.body; 
    const { course_number, userid } = req.params;
    OldUserLogic.deleteStudent(teacher_email, course_number, userid).then((result) => {
        if (result.length > 0) {
            res.status(200).send(`${result[0]["username"]} with role ${result[0]["role"]} has been deleted from ${result[0]["course_name"]}`)
        }
        else{
            res.send("Student does not exist in this course");
        }
    });
});

/*
    InLab functionality for teachers
*/
router.post('/dashboard/inlabs', (req, res) => {
    res.send("Page to create in labs")
});

router.get('/dashboard/inlabs/:course_number', (req, res) => {
    const { email } = req.body;
    const { course_number } = req.params;
    let Checkpoints = new CheckpointsLogic();
    Checkpoints.getCourseInlabs(email, course_number).then((inlabs) => {
        inlabs.length > 0 ? res.send(inlabs) : res.send("No labs exist for this course.");
    }).catch(() => {
        res.status(404).send('Not Found.');
    });
});

router.put('/dashboard/inlabs/:course_number/:inlab', (req, res) => {
    const {email, checkpointid} = req.body; 
    const {course_number, inlab} = req.params;
    let Checkpoints = new CheckpointsLogic();
    Checkpoints.updateInLabCheckpoints(email, course_number, inlab, checkpointid).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(404).send("Not Found");
    });
});

router.delete("/dashboard/inlabs/:course_number", (req, res) => {
    res.send("Delete from Checkpoints table then delete from inlabs table");
});

/*
    Ability to create edit and delete annoucements
*/
router.get('/dashboard/announcements/:course_number', teacherAuth, (req, res) => {
    let AnnoucementsLogic = new ContentsLogic();
    const { teacher_email, content_type } = req.body; 
    const { course_number } = req.params;
    AnnoucementsLogic.getCourseContent(teacher_email, course_number, content_type).then((result) => {
        if (result.length > 0){
            res.send(result)
        }
        else{
            res.send("Announcements have not been created for this course.");
        }
    });
});

router.get('/dashboard/announcements/:course_number/:content_id', teacherAuth, (req, res) => {
    let AnnoucementsLogic = new ContentsLogic();
    const { teacher_email, content_type } = req.body; 
    const { course_number, content_id } = req.params;
    AnnoucementsLogic.getSpecificCourseContent(teacher_email, content_type, course_number, content_id).then((result) => {
        if (result.length > 0){
            res.send(result)
        }
        else{
            res.send("That Announcement does not exist for this course.");
        }
    });
});

router.post('/dashboard/announcements/:course_number', teacherAuth, (req, res) => {
    let AnnoucementsLogic = new TeacherLogic();
    const { teacher_email } = req.body; 
    const { course_number } = req.params;
    AnnoucementsLogic.createCourseContent(teacher_email, course_number).then((result) => {
        console.log(result);
        res.send("Announcement Created.");
    }).catch(() => {
        res.status(404).send("Not Found.")
    });
});

router.put('/dashboard/announcements/:course_number', teacherAuth, (req, res) => {
    res.send("Announcement Edited.");
});

router.delete('/dashboard/announcements/:course_number', teacherAuth, (req, res) => {
    res.send("Announcement Deleted.");
});

// notes
router.get('/dashboard/notes/:course_number', (req, res) => {
    let NotesLogic = new ContentsLogic();
    let email = "admin@test.com";
    let content_type = "Note";
    const { course_number } = req.params;
    console.log(email)
    NotesLogic.getCourseContent(email, course_number, content_type).then((result) => {
        if (result.length > 0){
            res.send(result)
        }
        else{
            res.send("")
        }
    });
});

router.get('/dashboard/notes/:course_number/:content_id', teacherAuth, (req, res) => {
    let NotesLogic = new ContentsLogic();
    const { teacher_email, content_type } = req.body; 
    const { course_number, content_id } = req.params;
    NotesLogic.getSpecificCourseContent(teacher_email, content_type, course_number, content_id).then((result) => {
        if (result.length > 0){
            res.send(result)
        }
        else{
            res.send("That Note does not exist for this course.");
        }
    });
});

router.post('/dashboard/notes/:course_number', teacherAuth, (req, res) => {
    let NotesLogic = new TeacherLogic();
    const { teacher_email } = req.body; 
    const { course_number } = req.params;
    NotesLogic.createCourseContent(teacher_email, course_number).then((result) => {
        console.log(result);
        res.send("Announcement Created.");
    }).catch(() => {
        res.status(404).send("Not Found.")
    });
});

router.put('/dashboard/notes/:course_number', teacherAuth, (req, res) => {
    res.send("Announcement Edited.");
});

router.delete('/dashboard/notes/:course_number', teacherAuth, (req, res) => {
    res.send("Announcement Deleted.");
});

// messages
router.get('/messages/:messageid', (req, res) => {
    let MessageLogic = new GroupMessageLogic();
    MessageLogic.getMessage(req.params.messageid).then((message) => res.send(message));
});

module.exports = router;