const jwt = require('jsonwebtoken');
const secretKey = 'Yg!bI7jkYg!bI7j9ACruHk#=FEgPx-QS';

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, secretKey);
        req.userData = decoded;
        if (decoded.role === 'Teacher'){
            next();
        }
        else{
            res.status(401).json({
                message: "Authentication Failed"
            });
        }
    }
    catch{
        return res.status(401).json({
            message: "Authentication Failed"
        });
    }
}