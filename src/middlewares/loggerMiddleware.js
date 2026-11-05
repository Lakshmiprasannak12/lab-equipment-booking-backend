const loggerMiddleware = (req, res, next) => {

    console.log(
        req.method,
        req.originalUrl,
        new Date().toLocaleString()
    );

    next();
};

module.exports = loggerMiddleware;