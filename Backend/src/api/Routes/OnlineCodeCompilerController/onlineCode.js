const express = require("express");
const router = express.Router();
const onlineCodeLogic = require('../../BLL/onlineCodeLogic');
const { spawn } = require('child_process');
const { exec } = require('child_process');

router.get('/', (req, res) => {
    const { language } = req.body;
    res.redirect(`/dashboard/onlineCode/${language}`);
});

router.get('/:language', (req, res) => {
    const { language } = req.params;
    try{
        if (language === "C++"){
            async function compile() {
                await spawn('g++', ['/Users/joseph.branch/Desktop/API/src/api/Test.cpp']);
            }
            compile().then(
            exec('/Users/joseph.branch/Desktop/API/src/a.out', (stdout, err, stderr) => {
                if (err) {
                    res.send(err);
                }
                else if (stderr)
                {
                    res.send(stderr);
                }
                else{
                    res.send(stdout);
                }
            }));
        }
        else if (language === "Python3"){
            const s = spawn('python3', ['/Users/joseph.branch/Desktop/API/src/api/Test.py']);
            s.stdout.on('data', (stdout, err, stderr) => {
                if (err) {
                    res.send(err);
                }
                else if (stderr)
                {
                    res.send(stderr);
                }
                else{
                    res.send(stdout.toString('utf8'));
                }
            });
        }
    }
    catch (err){
        console.log(err)
    }
    return;

})

module.exports = router;