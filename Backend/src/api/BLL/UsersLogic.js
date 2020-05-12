const UsersDBA = require('../BDA/UsersService');
const bcrypt = require('../../node_modules/bcrypt');
const jwt = require('../../node_modules/jsonwebtoken');
const secretKey = 'Yg!bI7jkYg!bI7j9ACruHk#=FEgPx-QS';

class UserLogic 
{
    verifyUser(email, password){
        let ExistingUserDBA = new UsersDBA();
        let userInfo = [];
        let verified = ExistingUserDBA.userExist(email).then((result) => {
            if(result.length > 0){
                let userEmail = result[0]['(found_email)'];
                let userPassword = result[0]['password'];
                let userRole = result[0]['role'];
                userInfo.push(email, userPassword, userRole);
                if (userEmail !== null || userPassword !== null){
                    if (userPassword !== null){
                        return bcrypt.compare(password, userPassword).catch((err) => {
                            console.log(err);
                        });
                    };
                };
            };
        });
        return verified.then((validUser) => {
            if (validUser){
                let token = this.getToken(userInfo[0], userInfo[2]);
                let userAttributes = [];
                userAttributes.push(token, userInfo[2]);
                return userAttributes;
            }
            else{
                return false;
            }
        }).catch((err) => {
            console.log(err)
        });
    };

    getToken(email, role){
        let username = email.split('@')[0];
        return jwt.sign({
            username: username,
            email: email,
            role: role
        }, secretKey,{
            expiresIn: "1h"
        });
    };
}

module.exports = UserLogic;