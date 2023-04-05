// Sayfa Dış Gereksinimleri
const express = require('express'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')
      ejs = require('ejs'),
      methodOverride = require('method-override')

// Routes
const pageRoutes = require('./Routes/pageRoutes')
const authRoutes = require('./Routes/authRoutes')
// Kontrolcü Gereksinimleri
const HareketController = require('./Controllers/hareketController')

//Middleares gereksinimleri
const ServerConnectionsMiddlewares = require('./Middlewares/ServerConnectionsMiddlewares')

const app = express();

//DATABASE CONNECT
app.set(ServerConnectionsMiddlewares.mongoConnect)

//MIDDLEWARES
app.set('view engine', 'ejs')
app.use(methodOverride('_method',{methods: ["POST","GET"]}))
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: 'mongodb+srv://admin:Ac123321.@cluster0.rvtg8fq.mongodb.net/misfitSessions?retryWrites=true&w=majority',
    }),
    })
  );
  app.use('*', (req, res, next) => {
    global.currentUser = req.session.userID;
    next();
  });
  
  //CONTROLLERS
  app.use(HareketController)
  app.use(pageRoutes)
  app.use(authRoutes)
  
  
  // Server Setting
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server ${port} portunda başlatıldı`)
})
