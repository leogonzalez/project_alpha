//Javascript file that contains the routes
'use strict';

var path = process.cwd();

var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function(app,passport){
    //middleware for authentication
    function isLoggedIn(req,res,next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }

    var clickHandler= new ClickHandler();

    app.route('/')
    .get(isLoggedIn,function(req,res){
        res.sendFile(path+'/public/index.html');
    });

    app.route('/login')
    .get(function(){
        res.sendFile(path + 'public/login.html');
    });

    app.route('/logout')
    .get(function (req,res) {
        req.logout();
        req.redirect('/login');
    });

    app.route('/profile')
    .get(isLoggedIn,function(req,res){
        res.sendFile(path+'/public/profile.html');
    });

    app.route('/api/:id')
    .get(isLoggedIn,function(req,res){
        res.json(req.user.github);
    });

    app.route('/auth/github')
    .get(passport.authenticate('github'));

    app.route('/auth/github/callback')
    .get(passport.authenticate('github',{
        successRedirect:'/',
        failureRedirect:'/login'
    }));

    app.route('/api/:id/clicks')
    .get(isLoggedIn,clickHandler.getClicks)
    .post(isLoggedIn,clickHandler.addClick)
    .delete(isLoggedIn,clickHandler.resetClicks);

    app.route('/api/clicks')
    .get(clickHandler.getClicks)
    .post(clickHandler.addClick)
    .delete(clickHandler.resetClicks);

};
