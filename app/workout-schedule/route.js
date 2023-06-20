module.exports = (router) => {
  const controller = require("./controller");
  // GET
  router.get(
    "/api/v1/workout-schedule",
    controller.getContentWorkoutScheduleCT
  );
};
