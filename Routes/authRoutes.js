const express = require('express')
const router = express.Router();

const {LogOut,SignUp, SignIn} = require('../Controllers/authControllers')

router.post('/signup', SignUp)
router.post('/signin', SignIn)
router.get('/logout', LogOut)

router.delete('/user/:id', (req,res) => {
    const userID = req.params.id
    console.log(userID)
})

module.exports = router