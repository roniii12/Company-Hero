const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:-----@localhost:3306/sys',{
    define:{
        timestamps:false
    }
})
try {
sequelize.authenticate();
console.log('Connection has been established successfully.');
} catch (error) {
console.error('Unable to connect to the database:', error);
}
module.exports = sequelize;