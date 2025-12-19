function requireAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    res.status(403).send('Brak dostępu');
}

function requireAuth(req, res, next) {
    if (req.session.user) return next();
    res.redirect('/login');
}

module.exports = { requireAdmin, requireAuth };
