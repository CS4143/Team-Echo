const CheckpointsDBA = require('../BDA/CheckpointsService');

class CheckpointsLogic 
{
    getCourseInlabs(email, course_number){
        let Checkpoints = new CheckpointsDBA();
        return Checkpoints.getCourseInlabs(email, course_number);
    };

    getInLabCheckpoints(email, course_number, inlab){
        let Checkpoints = new CheckpointsDBA();
        return Checkpoints.getInLabCheckpoints(email, course_number, inlab);
    };

    updateInLabCheckpoints(email, course_number, inlab, checkpointid){
        let Checkpoints = new CheckpointsDBA();
        return Checkpoints.updateInLabCheckpoints(email, course_number, inlab, checkpointid);
    };
}

module.exports = CheckpointsLogic;