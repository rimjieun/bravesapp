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

        process.nextTick(() => {

            Vendor.findOne({"local.email": email}, (err, user) => {
                if(err){
                    return done(err);
                }

                if(user){
                    return done(null, false, req.flash('SignupMessage', "That email is already taken"));
                } else{
                    const newVendor = new Vendor();

                    newVendor.local.email = email;
                    newVendor.local.passport = newVendor.generateHash(password);

                    newVendor.save((err) => {
                        if(err)
                            throw err;
                        return done(null, newVendor);

                    });
                }
            });
        });
    }));


};