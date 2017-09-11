const LocalStrategy =  require("passport-local").Strategy;

const Vendor = require("./modals/vendor");

module.exports = (passport) => {

    passport.serializeUser((user, done) => {

        done(null, user.id);

    });

    passport.deserializeUser((id, done) => {

        Vendor.findById(id, (err, user) => {

            done(err, user);

        });
    });

    passport.use("local-signup", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, (req, email, password, done) => {

        console.log(email, password);

        process.nextTick(() => {

            Vendor.findOne({"local.email": email}, (err, user) => {
                if(err){
                    return done(err);
                }

                if(user){
                    return done(null, false, {message: "Email already registered"});
                } else{
                    const newVendor = new Vendor();

                    newVendor.local.email = email;
                    newVendor.local.password = newVendor.generateHash(password);

                    newVendor.save((err) => {
                        if(err)
                            throw err;
                        return done(null, newVendor);

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