const express = require('express')
var cors = require('cors')

const { Sequelize,DataTypes } = require('sequelize');
const User = require('./models/Users');
const Hero = require('./models/Heroes');
const auth = require('./middleware/auth')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}));

var whitelist = ['http://localhost:4200']
var corsOptions = {
  origin: function (origin, callback) {
    try{
        console.log(origin);
        if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
        } else {
        callback(new Error('Not allowed by CORS'))
        }
    }catch(e){
        console.log(e);
    }
  }
}
app.options('*',cors(corsOptions))

app.get('/getAllHeroes', cors(corsOptions), auth, async function (req, res) {
    let heroes = await Hero.findAll({where:{trainer:req.user.username}});
    res.json(heroes);
})

app.put('/createHero',cors(corsOptions),auth, async (req,res)=>{
    let hero = req.body;
    console.log(hero)
    let result = await Hero.createHero(hero.name,hero.ability,hero.suiteColors,hero.startingPower,hero.currentPower,req.user.username);
    res.send(result);
})

app.post('/getHero',cors(corsOptions),auth,async (req,res)=>{
    let guid = req.body._guid;
    let hero = await Hero.findOne({
        where:{
            _guid:guid,
            trainer: req.user.username
        }
    })
    if(!hero){
        return res.status(400).send('UNKNOWN_HERO')
    }
    res.send(hero.toJSON())
})

app.post('/updatePowerHero',cors(corsOptions),auth, async (req,res)=>{
    try{
        let body = req.body;
        await Hero.update({
            currentPower:body.power
        },
        {where: {_guid:body._guid}}
        );
        let hero = await Hero.findOne({
            where:{_guid:body._guid}
        })
        if(!hero)
            return res.status(400).send('UNKNOWN_HERO')
        res.json(hero.toJSON())
    }catch(e){
        console.log(e)
        res.status(400).send('UNKNOWN_HERO')
    }
})
app.post('/signUp',cors(corsOptions),async(req,res)=>{
    try{
        body = req.body;
        const user = await User.createUser(body.username,body.password)
        res.status(200).json(user.toJSON());
    }catch(e){
        res.status(400).json({error:{message:"USERNAME_EXISTS"}});
    }
})
app.post('/login',cors(corsOptions), async (req, res)=>{
    try{
        console.log(req.body);
        const user = await User.auth(req.body.username,req.body.password);
        console.log(user.toJSON())
        if(user){
            return res.status(200).json({username: user.username, idToken:user.token, expiresIn:(60*15)});
        }
        res.status(400).json({error:{message:"INVALID_AUTH"}});
    }catch(e){
        console.log(e);
        res.status(400).json({error:{message:"INVALID_AUTH"}});
    }
})
app.listen(3000)