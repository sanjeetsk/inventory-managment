export const setLastVisit = (req, res, next) => {
    //1. if cookies is set, add a local variable with the last visit time data.
    if(req.cookies.lastVisit){
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
    res.cookie(
        'lastVisit', 
        new Date().toISOString(), 
        {
            maxAge: 2*24*60*60*1000,
        }
    );

    next();
}