const express = require("express");
const router = express.Router();
const isSignedin = require('../middleware/is-signed-in')
const Entry = require('../models/Entry')

router.get('/new',isSignedin,(req,res)=>{
    res.render('entry.ejs')
})

router.post('/new', async(req,res)=>{
    req.body.isPublic = Boolean(req.body.isPublic)
    const newEntry = await Entry.create({
        title: req.body.title,
        entryBody: req.body.entryBody,
        isPublic:  req.body.isPublic,
        owner: req.session.user._id
    })
    console.log(newEntry)
    res.redirect("./entries/my-entries.ejs")
})

router.get('/all-entries',isSignedin, async(req,res)=>{
    const allEntries = await Entry.find({isPublic: true})
    res.render('./entries/all-entries.ejs', {entries: allEntries})
})

router.get('/my-entries',isSignedin, async(req,res)=>{
    const allEntries = await Entry.find({owner: req.session.user._id})
    res.render('./entries/my-entries.ejs', {entries: allEntries})
})
module.exports = router;