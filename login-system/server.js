const express = require('express');
const path = require('path')
const crypto = require('crypto')
const session = require('express-session');
const router = require('./router');
const nocache = require('nocache');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
app.use('/static', express.static(path.join(__dirname, 'public')))

const secret = crypto.randomBytes(64).toString('hex')
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}))

app.use('/route', router)

app.get('/', nocache(), (req, res) => {
    if (req.session.user) {
        return res.redirect('/route/dashboard')
    }
    let passedVariable = req.query.valid;
    let invalidEmail = req.query.invalid_email
    let invalidPassword = req.query.invalid_password
    res.render('base', { title: 'Login System', err: passedVariable, invalidEmail, invalidPassword });
})

app.listen(port, () => { console.log("Listening to server http://localhost:3000") })

