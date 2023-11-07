const requireUser = (req, res, next) =>{
    if(!req.user) {
        res.status(401).send("Sorry, you need an account to do that.")
    }
    next();
};

module.exports ={
    requireUser
}