const express = require('express')
const router = express.Router();

const {renderDashboardPage,renderloginPage,rednerSignupPage,renderSigninPage,renderContactPage,renderHomePage,renderAboutPage,renderTrainerPage,renderGalleryPage} = require('../Controllers/pageControllers')

router.get('/', renderHomePage)
router.get('/about', renderAboutPage)
router.get('/trainer', renderTrainerPage)
router.get('/gallery', renderGalleryPage )
router.get('/contact', renderContactPage)
router.get('/signin', renderSigninPage)
router.get('/signup', rednerSignupPage)
router.get('/login', renderloginPage)
router.get('/dashboard', renderDashboardPage)

module.exports = router