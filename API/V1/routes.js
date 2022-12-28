const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    const moduleFiles = fs.readdirSync(path.join(__dirname, "/modules"));
    for (let i = 0; i < moduleFiles.length; i++) {
        const routeLoc = path.join(__dirname, "/modules/") + moduleFiles[i];
        const routeFiles = fs.readdirSync(routeLoc);
        routeFiles.forEach(function(file) {
            const fileName = file.split(".");
            const modelData = fileName[1];
            if (modelData === "routes" || modelData === "controller") {
                return require(routeLoc + "/" + file)(app);
            }
        });
    }
};
