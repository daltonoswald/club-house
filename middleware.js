module.exports.isSignedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports.alreadySignedIn = (req, res, next) => {
    if (!req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports.isAdmin = (req, res , next) => {
    if (req.user.isadmin) {
        next();
    } else {
        res.redirect('/');
    }
}