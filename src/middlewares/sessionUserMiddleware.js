function addUserToLocals(req, res, next) {
    res.locals.user = req.session.user || null;
    res.locals.Title = 'LiberalPost';
    next();
}


module.exports = { addUserToLocals };
