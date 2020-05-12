const Sequelize = require("../node_modules/sequelize");

var db = new Sequelize('CS_Database', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

db.authenticate()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(`Error ${err}`));

module.exports = db;