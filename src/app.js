const express = require('express');
const path = require('path');
const session = require('express-session');

const authRouter = require('./routes/authRouter');
const postsRouter = require('./routes/postsRouter');

const { addUserToLocals } = require('./middlewares/sessionUserMiddleware');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(session({
    secret: 'tajny_klucz',
    resave: false,
    saveUninitialized: false
}));

app.use(addUserToLocals);

app.use('/', postsRouter);
app.use('/auth', authRouter);
app.use(errorHandler);

module.exports = app;
