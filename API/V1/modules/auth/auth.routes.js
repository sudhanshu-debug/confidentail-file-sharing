module.exports = (app) => {
    app.route("/api/v1/null").get((req, res) => {
        console.log("Hitted");
    });
};
