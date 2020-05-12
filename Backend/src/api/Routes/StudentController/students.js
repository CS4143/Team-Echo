const express = require("express");
const router = express.Router();
const StudentLogic = require('../../BLL/StudentsLogic');
const CheckpointsLogic = require("../../BLL/CheckpointsLogic");
const GroupMessageLogic = require('../../BLL/GroupMessageLogic');
const ContentsLogic = require('../../BLL/ContentsLogic');
const AssignmentLogic = require('../../BLL/AssignmentsLogic');
const proctorAuth = require('../../Authentication/ProctorAuth');
const studentAuth = require('../../Authentication/StudentAuth');

/*
    ROUTE SECTION: INDEX PAGE
    TODO: COMPLETE
*/
router.get('/', (req, res) => {
    res.redirect('/student/dashboard');
});

router.get('/dashboard', (req, res) => {
    res.send('Dashboard');
});

/*
    ROUTE SECTION: WIKI
    TODO: COMPLETE
*/
router.get('/dashboard/wiki', (req, res) => {
    res.send("https://wiki.cs.astate.edu/index.php/Main_Page");
});

/*
    ROUTE SECTION: ASTATE
    TODO: COMPLETE
*/
router.get('/dashboard/astate', (req, res) => {
    res.send("https://www.astate.edu");
});

/*
    ROUTE SECTION: BLACKBOARD
    TODO: COMPLETE
*/
router.get('/dashboard/blackboard', (req, res) => {
    res.status(301).json({
        url: "https://bblearn.astate.edu"
    });
});

/*
    ROUTE SECTION: ASSIGNMENTS
    TODO: ADD POST, PUT, AND DELETE
*/
router.get('/dashboard/assignments/:course_number', (req, res) => {
    let Assignments = new AssignmentLogic();
    let email = 'student1@test.com';
    const { course_number } = req.params;

    Assignments.getCourseAssignments(email, course_number).then((assignments) => {
        res.send(assignments);
    }).catch((err) => {
        console.log(err)
    });
});

/*
    ROUTE SECTION: GRADES
    TODO: TEST
*/
router.get('/dashboard/grades', (req, res) => {
    let CurrentStudentLogic = new StudentLogic();
    const { email } = req.body;
    
    CurrentStudentLogic.getGrades(email).then((grades) => {
        res.status(200).send(grades);
    }).catch((err) => {
        console.log(err)
    });
});

router.get('/dashboard/grades/:course_number', studentAuth, (req, res) => {
    let CurrentStudentLogic = new StudentLogic();
    let email = 'student1@test.com';
    const { course_number } = req.params;

    CurrentStudentLogic.getCourseGrades(email, course_number).then((grades) => {
        res.status(200).send(grades);
    }).catch((err) => {
        console.log(err)
    });
});

/*
    ROUTE SECTION: IN-LABS CHECKPOINTS
    TODO: TEST
    ACCESS: PROCTORS ONLY
*/
router.get('/dashboard/inlabcheckpoints', (req, res) => {
    const {course_number, inlab} = req.body;
    inlab !== undefined ? res.redirect(`/student/dashboard/inlabcheckpoints/${course_number}/${inlab}`) :
                        res.redirect(`/student/dashboard/inlabcheckpoints/${course_number}`);
});

router.get('/dashboard/inlabcheckpoints/:course_number', (req, res) => {
    let email = 'student2@test.com';
    const { course_number } = req.params;
    let Checkpoints = new CheckpointsLogic();
    Checkpoints.getCourseInlabs(email, course_number).then((inlabs) => {
        inlabs.length > 0 ? res.send(inlabs) : res.send("");
    }).catch(() => {
        res.status(404).send('Not Found.');
    });
});

router.get('/dashboard/inlabcheckpoints/:course_number/:inlab', (req, res) => {
    let email = 'student2@test.com';
    const { course_number, inlab } = req.params;
    let Checkpoints = new CheckpointsLogic();
    Checkpoints.getInLabCheckpoints(email, course_number, inlab).then((checkpoints) => {
        if (checkpoints.length > 0){
            res.send(checkpoints);
        }
        else{
            res.send("No Checkpoints exist for this lab");
        }
    }).catch(() => {
        res.status(404).send("Not Found");
    });
});

// Update the checkpoints of a specifc inlab
router.put('/dashboard/inlabcheckpoints/:course_number/:inlab', (req, res) => {
    let email = 'student2@test.com';
    let { checkpointid } = req.query
    const { course_number, inlab } = req.params;
    let Checkpoints = new CheckpointsLogic();
    console.log(checkpointid)
    Checkpoints.updateInLabCheckpoints(email, course_number, inlab, checkpointid).then((result) => {
        res.send(result);
    }).catch(() => {
        res.status(404).send("Not Found");
    });
});

/*
    ROUTE SECTION: GROUP MESSAGING
    TODO: ADD DELETE AND PUT REQUEST
*/
router.get('/dashboard/groups', (req, res) => {
    let email = 'student1@test.com';
    // console.log(req)
    let MessageLogic = new GroupMessageLogic();
    MessageLogic.getGroups(email).then((groups) => {
        if(groups.length > 0){
            res.send(groups);
        }
        else{
            res.send("");
        }
    }).catch((err) => {
        console.log(err)
    }); 
});

router.get('/dashboard/groups/:group_number/messages', (req, res) => {
    let email = 'student1@test.com';
    const { group_number } = req.params;
    let MessageLogic = new GroupMessageLogic();
    MessageLogic.getGroupMessages(email, group_number).then((messages) => {
        // console.log(1)
        if(messages.length > 0){
            res.send(messages);
        }
        else{
            res.status(200).json([{message: "This group has no messages."}]);
        }
    }).catch(() => {
        res.status(404).send("Page Not Found");
    }); 
});

router.post('/dashboard/groups/:group_number/newMessage', (req, res) => {
    let email = 'student1@test.com';
    const { group_number } = req.params;
    let { message } = req.body;
    let MessageLogic = new GroupMessageLogic();
    MessageLogic.newMessage(email, message, group_number).then((result) => {
        res.send(result);
    });
});

router.put('/dashboard/groups/:group_number/editMessage', (req, res) => {
    let email = 'student1@test.com';
    console.log("Pause")
    const { group_number } = req.params;
    const { message, message_id } = req.body;
    let MessageLogic = new GroupMessageLogic();
    MessageLogic.editedMessage(email, message, group_number, message_id).then((result) => {
        res.send(result);
    });
});

/*
    Announcements functionallity 
*/
/*
    ROUTE SECTION: ANNOUNCEMENTS
    TODO: TEST
*/
router.get('/dashboard/announcements', (req, res) => {
    const { email } = req.body;
    const { content_type } = req.body;
    let Contents = new ContentsLogic();
    if(content_type === 'Announcement'){
        Contents.getCourseContent(email, content_type).then((announcements) => {
            res.status(200).send(announcements);
        }).catch(() => {
            res.status(404).send("Page Not Found");
        });
    }
    else{
        res.status(404).send("Page Not Found");
    };
});

router.get('/dashboard/announcements/:course_number', (req, res) => {
    console.log(req)
    const { course_number } = req.params;
    let Contents = new ContentsLogic();
    let email = 'student1@test.com';
    let content_type = "Announcement";
    if (content_type === "Announcement"){
        Contents.getCourseContent(email, course_number, content_type).then((announcements) => {
            res.status(200).send(announcements);
        }).catch(() => {
            res.status(404).send("Page Not Found");
        });
    }
    else{
        res.status(404).send("Page Not Found");
    };
});

/*
    ROUTE SECTION: NOTES
    TODO: TEST
*/
router.get('/dashboard/notes', (req, res) => {
    const {email} = req.body;
    const {content_type} = req.body;
    let Contents = new ContentsLogic();
    Contents.getCourseContent(email, content_type).then((notes) => {
        res.status(200).send(notes);
    }).catch(() => {
        res.status(404).send("Page Not Found");
    });
});

router.get('/dashboard/notes/:course', (req, res) => {
    const {email, content_type} = req.body;
    const {course} = req.params;
    let Contents = new ContentsLogic();
    if(content_type === 'Note'){
        Contents.getCourseContent(email, content_type, course).then((notes) => {
            res.status(200).send(notes);
        }).catch(() => {
            res.status(404).send("Page Not Found");
        });
    }
    else{
        res.status(404).send("Page Not Found");
    };
});

router.get('/dashboard/recent', (req, res) => {

});

module.exports = router;

// Create a secure hash and downloadable script
// Guess a true random number, hash it, and store that

// id, user_id, file_name, original_filename, file_token

// stream the file to the user
// Check special characters 
// Teacher ability to delete student picture

/*
    POSSIBLE ROUTES FOR FUTURE
*/
router.get('/dashboard/groups/:group_number', (req, res) => {
    const { email } = req.body;
    const { group_number } = req.params;
    let MessageLogic = new GroupMessageLogic();
    MessageLogic.getGroup(email, group_number).then((group) => {
        if(group.length > 0){
            res.send(group);
        }
        else{
            res.status(404).send("Page Not Found");
        }
    }).catch(() => {
        res.status(404).send("Page Not Found");
    });
});