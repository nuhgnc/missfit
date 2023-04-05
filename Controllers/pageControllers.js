const express = require('express')

const User = require('../models/User')

const router = express.Router();


exports.renderHomePage = async (req,res) => {
    const user = await User.findById(req.session.userID)
    const pageName = req.url
    res.render('./home/index', {user, pageName})
}

exports.renderAboutPage = async (req,res) => {
    const pageName = req.url
    const user = await User.findById(req.session.userID)
    res.render('./about/about', {pageName,user})
}

exports.renderTrainerPage = async (req,res) => {
    const pageName = req.url
    const user = await User.findById(req.session.userID)
    const trainers = await User.find({role:'trainer'})
    console.log(trainers)
    res.render('./trainer/trainer',{pageName,user,trainers})
}

exports.renderGalleryPage = async (req,res) => {
    const pageName = req.url
    const user = await User.findById(req.session.userID)
    res.render('./gallery/gallery',{pageName,user})
}

exports.renderContactPage = (req,res) => {
    const pageName = req.url
    res.render('./contact/contact',{pageName})
}

exports.renderSigninPage = (req,res) => {
    res.render('./login/signin')
}

exports.rednerSignupPage = (req,res) => {
    res.render('./login/signup')
}

exports.renderloginPage =  (req,res) => {
    res.render('./login/login')
}

exports.renderDashboardPage = async (req,res) => {
    const pageName = req.url
    const AllUser = await User.find()
    const user = await User.findById(req.session.userID)
    res.render('dashboard/dashboard', {pageName,user, AllUser})
}
