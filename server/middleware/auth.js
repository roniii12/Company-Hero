const jwt = require('jsonwebtoken')
const User = require('../models/Users')


const auth = async (req, res, next) => {
    try {
        //const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.query.auth;
        console.log(token)
        // let token = cookie.substring(cookie.indexOf("token=")+6);
        // const end = token.indexOf("; ")
        // if(end!=-1)
        //     token = token.substring(0, end);
        const decoded = jwt.verify(token, "secret")
        const user = await User.findOne({where:{ username: decoded._id, token:token} })
        if (!user) {
            return res.status(400).json({error:{message:"unauthorized"}});
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        console.log(e);
        res.status(400).json({error:{message:"unauthorized"}});
    }
}

module.exports = auth