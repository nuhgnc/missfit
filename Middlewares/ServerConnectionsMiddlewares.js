const mongoose = require('mongoose')
const express = require ('express')
const app = express()

const mongoConnect =  mongoose.connect('mongodb+srv://admin:Ac123321.@cluster0.rvtg8fq.mongodb.net/misfit')
.then( console.log('mongoDB Serverina bağlandı'))
.catch(err => {
    app.render('databaseError', {err})
});




module.exports = {
    mongoConnect,
}