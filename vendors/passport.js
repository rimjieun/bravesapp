const LocalStrategy =  require("passport-local").Strategy;
const User = require("../backend/models/user");



module.exports = (passport) => {

    passport.serializeUser((user, done) => {

        done(null, user.id);

    });

    passport.deserializeUser((id, done) => {

        User.findById(id, (err, user) => {

            done(err, user);

        });
    });

    passport.use("local-signup", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    }, (req, email, password, done) => {

        console.log(req.body.username);

        process.nextTick(() => {

            User.findOne({"username": req.body.username}, (err, user) => {
                if(err){
                    return done(err);
                }

                if(user){
                    return done(null, false, {message: "Email already registered"});
                } else{
                    const newUser = new User();
                    newUser.username = req.body.username;
                    newUser.currentOrder.vendorName = req.body.vendorName;
                    newUser.role = "vendor";
                    newUser.lastName = req.body.lastName;
                    newUser.firstName = req.body.firstName;
                    newUser.sectionNumber = 2;
                    newUser.password = newUser.hashPassword(password);
                    console.log(newUser);

                    newUser.save((err) => {
                        if(err)
                            throw err;
                        return done(null, newUser);

                    });
                }
            });
        });
    }));


    passport.use("local-login", new LocalStrategy({
        usernameField:"email",
        passwordField: "password",
        passReqToCallback: true
    }, function (req, email, password, done) {

        Vendor.findOne({"local.email": email}, function (err, user) {
            if(err)
                return done(err);
            if(!user)
                return done(null, false, {message: "No user found"});

            if(!user.validatePassword(password))
                return done(null, false, {message: "Ooops! wrong password"});

            return done(null, user);
        });
    }));


};