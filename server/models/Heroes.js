const sequelize = require('../db/mysql')
const { DataTypes, where } = require('sequelize');
const Guid = require('guid');

const Heroes = sequelize.define('heroes',{
    _guid:{
        type: DataTypes.STRING(200),
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        unique: true
    },
    name:{
        type: DataTypes.STRING(45)
    },
    ability:{
        type: DataTypes.STRING(45)
    },
    date:{
        type: DataTypes.DATE
    },
    suiteColors:{
        type: DataTypes.STRING(45)
    },
    startingPower:{
        type: DataTypes.DECIMAL(50,3)
    },
    currentPower:{
        type: DataTypes.DECIMAL(50,3)
    },
    trainer:{
        type: DataTypes.STRING(45)
    }
})
Heroes.createHero = async(name,ability,suiteColors,startingPower,currentPower,date=new Date())=>{
    console.log(name)
    console.log(ability)
    console.log(date)
    console.log(suiteColors)
    console.log(startingPower)
    console.log(currentPower)

    if(!name||!ability||!suiteColors||!startingPower||!currentPower){
        throw new Error('Unable to create Hero')
    }
    const guid = Guid.create();
    console.log('----------------')
    console.log(guid.value);
    const hero = await Heroes.create({
        _guid:guid.value,
        name,
        ability,
        date,
        suiteColors,
        startingPower,
        currentPower
    });
    return hero;
}
module.exports = Heroes;