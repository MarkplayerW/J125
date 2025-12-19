const crypto = require('crypto');
const userStorage = require('../models/userStorage');

function hash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

async function loginForm(req, res) {
    res.render('auth/login', { error: null });
}

async function login(req, res) {
    const { username, password } = req.body;
    const user = await userStorage.getUser(username);

    if (!user || user.password !== hash(password)) {
        return res.render('auth/login', { error: 'Błędne dane' });
    }

    req.session.user = user;
    res.redirect('/');
}

function logout(req, res) {
    req.session.destroy(() => res.redirect('/'));
}

async function registerForm(req, res) {
    res.render('auth/register', {
        Title: 'Rejestracja',
        errors: null,
        values: {}
    });
}

async function register(req, res) {
    const { username, password } = req.body;
    const errors = [];

    if (!username || username.length > 16) {
        errors.push('Login max 16 znaków.');
    }

    if (
        !password ||
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[!@#$%^&*]/.test(password)
    ) {
        errors.push('Hasło min. 8 znaków, duża litera i znak specjalny.');
    }

    const existing = await userStorage.getUser(username);
    if (existing) {
        errors.push('Użytkownik już istnieje.');
    }

    if (errors.length > 0) {
        return res.status(400).render('auth/register', {
            Title: 'Rejestracja',
            errors,
            values: { username }
        });
    }

    await userStorage.createUser({
        username,
        password: hash(password),
        role: 'user'
    });

    res.redirect('/auth/login');
}

module.exports = 
{
    loginForm,
    login,
    logout,
    registerForm,
    register,
    hash
}
