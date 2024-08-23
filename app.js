const express = require('express');
const passport = require('passport');
const session = require('express-session');
const indexRouter = require('./routes/indexRoutes');
const userRouter = require('./routes/userRoutes');

const path = require('node:path');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SECRET || SECRET,
        resave: false,
        saveUninitialized: true,
    })
)

app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', userRouter);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs');

const PORT = 3000;
app.listen(PORT, () => console.log(`Club House listening on port ${PORT}`));