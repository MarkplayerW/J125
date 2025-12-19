function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('errors', {
        Title: 'Błąd serwera',
        error: err.message || 'Wystąpił nieoczekiwany błąd.'
    });
}

module.exports = { errorHandler };