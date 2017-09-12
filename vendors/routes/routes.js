
module.exports = (app, path, passport) => {

    const isLoggedIn = (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        } else{
            res.redirect("/");
        }
    };


    app.get("/", (req, res) => {

        res.sendFile(path.join(__dirname, "/../views/login.html"));

    });

    app.get("/signup", (req, res) => {

        res.sendFile(path.join(__dirname, "/../views/signup.html"));

    });


    app.get("/dashboard", isLoggedIn, (req, res) => {
        console.log(req.user.local.email);
        console.log(req.user.local.password);

        res.sendFile(path.join(__dirname, "/../views/dashboard.html"));

    });


    app.get("/api", (req, res) => {

        const data = {
          name: "Mac Donald"
        };

        res.json(data);

    });

    app.get("/logout", function (req, res) {

        req.logout();

        res.redirect("/")
    });

    app.post("/signup", passport.authenticate("local-signup", {
        failRedirect:"/signup"
    }), function (req, res) {

        res.redirect("/dashboard")
    });


    app.post("/login", passport.authenticate("local-login", {
        failRedirect:"/"
    }), function (req, res) {
        res.redirect("/dashboard")
    });




};