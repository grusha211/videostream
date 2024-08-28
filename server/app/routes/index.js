const userRoutes = require("./userRoutes");
const videoRoutes = require("./videoRoutes");

const initRoutes = (app) => {
  app.use("/user", userRoutes());
  app.use("/video",videoRoutes());
};

module.exports = initRoutes;
