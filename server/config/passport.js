var passport = require('passport'),
    mongoose = require('mongoose'),
    express = require('express'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function(){
    
    passport.use(new LocalStrategy(
        function(username, password, done){
            User.findOne({username:username}).exec(function(err, user){
                if(user && user.authenticate(password)){
                    return done(null, user);
                }
                else{
                    return done(null, false);
                }
            })
        }
    ));

    passport.serializeUser(function(user, done){
        if(user){
            return done(null, user);
        }
    });

    passport.deserializeUser(function(id, done){
        User.findOne({_id:id}).exec(function(err, user){
            if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        })
    })
}