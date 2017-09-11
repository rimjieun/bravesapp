
module.exports = (app, path) => {


    app.get("/", (req, res) => {

        res.sendFile(path.join(__dirname, "/../views/index.html"));

    });


    app.get("/signup", (req, res) => {

        res.sendFile(path.join(__dirname, "/../views/signup.html"));

    });

    app.get("/login", (req, res) => {

        res.sendFile(path.join(__dirname, "/../views/login.html"));

    });

    app.get("/dashboard", (req, res) => {

        res.sendFile(path.join(__dirname, "/../views/dashboard.html"));

    });


    app.get("/api", (req, res) => {

        const data = {
          name: "Mac Donald"
        };

        res.json(data);

    });
};