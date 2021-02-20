const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        user.generateAuthToken()
        res.status(201).send({user})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users',auth, async (req,res)=>{
    try{
        const user = await User.find()
        res.status(201).send({user})
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router