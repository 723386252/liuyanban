const express=require('express')
const session = require('express-session')
const index = require('./router/index')
const login = require('./router/login')
const loginapi = require('./api/loginapi')
const releaseapi = require('./api/releaseapi')

const app = express()
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(index)
app.use(login)
app.use(loginapi)
app.use(releaseapi)

app.use('/module/',express.static('./node_modules'))
app.use('/assets/',express.static('./assets'))
 

const server = app.listen(8080 ,()=>{
  console.log("启动成功");
})

// let msg=[]
app.engine('html',require('express-art-template'))

server.setTimeout(0)