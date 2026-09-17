const express = require("express");
const router = express.Router();
const isAdmin = require('../middleware/isAdmin')
const User = require('../models/User')

router.get('/' ,isAdmin , async (req,res)=>{
    const allUsers = await User.find()
    res.render('admin/all-user.ejs' , {allUsers})
})

router.put('/toggle-admin/:uID', isAdmin, async(req, res) =>{
    const user = await User.findByIdAndUpdate(req.params.uID , {isAdmin: !req.params.isAdmin})
    res.redirect('/admin')
} )

router.put('/delete/:uID', isAdmin, async(req, res) =>{
    const user = await User.findByIdAndUpdate(req.params.uID , {isDeleted: true})
    res.redirect('/admin')
} )


module.exports = router;