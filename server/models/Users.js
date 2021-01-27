const sequelize = require('../db/mysql')
const { DataTypes, where } = require('sequelize');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = sequelize.define('users',{
    username:{
        type: DataTypes.STRING(45),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    password:{
        type: DataTypes.STRING(200)
    },
    token:{
        type: DataTypes.STRING(200),
        unique: true
  }
})

Users.auth = async (username,password)=>{
    const user = await Users.findOne({
         where: {
            username
         }
    })
    if (!user) {
        throw new Error('Unable to login')
    }
    let enc = await bcrypt.decodeBase64(password);
    console.log('------------------'+enc + '1111111111')
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    const token = jwt.sign({ _id: user.username.toString() }, "secret");
    user.token = token;
    console.log(token);
    await user.save();
    return user;
};

Users.createUser = async(username,password)=>{
    if(!username||!password){
        throw new Error('Unable to sign Up')
    }
    const hashPassword = await bcrypt.hash(password, 8)
    const user = await Users.create({
        username,
        password: hashPassword,
    });
    return user;
}
module.exports = Users;