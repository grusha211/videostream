const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./lib/db");
const init = require("./lib/express");
const packageFile = require("./package.json");

connectDB(() => {
    const app = init();

    const appStartMessage = () => {
        console.log("***********************************");
    console.log("API is Initialized");
    console.log(`App Name : video progress`);
    console.log(`Server Name : ${packageFile.name}`);
    console.log(`Environment  : development`);
    console.log(`App Port : ${process.env.PORT}`);
    console.log(`Process Id : ${process.pid}`);
    console.log("***********************************");
    };

    app.listen(process.env.PORT, appStartMessage);
});