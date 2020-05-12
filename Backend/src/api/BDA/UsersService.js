const db = require('../../Config/database');

class UsersDBA 
{
    async userExist(email){
        return await db.query("CALL CheckUserExist (:email)", 
            {replacements: { email: email }},
            {raw: true}
        );
    };
}

module.exports = UsersDBA;