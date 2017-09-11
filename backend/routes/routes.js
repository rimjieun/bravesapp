

module.exports = (app, path) => {
    
    app.get("/",  (req, res) => {

        res.json("Hello World");

    });


    app.get("/api", (req, res) => {

        res.json("I am the json");

    });
};