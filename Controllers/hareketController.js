const express = require('express');

const router = express.Router();


router.get('/HareketEkle', (req,res) => {
    res.render('./dashboard/HareketEkle')
})




module.exports = router