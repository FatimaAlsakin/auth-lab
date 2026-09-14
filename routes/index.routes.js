const router = require("express").Router()
const isSignedin = require('../middleware/is-signed-in')

router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})
module.exports = router;
