const editAccess = (req, res, next) => {
    console.log(req.user[0].role ,'req')
    if (req.user && req.user[0].role == 'edit') {
        next();
        return;
    }
    res.render('error' , {message: "you don't have permission"});
}

const viewAccess = (req, res, next) => {
    console.log(req.user[0].role ,'req')
    if (req.user && req.user[0].role == 'view') {
        next();
        return;
    }
    res.render('error' , {message: "you don't have permission as a view only user"});
}

const restrictedAccess = (req, res, next) => {
    console.log(req.user[0].role ,'req')
    if (req.user && req.user[0].role == 'restricted') {
        next();
        return;
    }
    res.render('error' , {message: "you don't have permission as a restricted user"});
}

module.exports.viewAccess = viewAccess;
module.exports.editAccess = editAccess;
module.exports.restrictedAccess = restrictedAccess;

