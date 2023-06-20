const { throwError } = require("../../utils/index");
const { WorkoutSchedule } = require("./configDB");
module.exports = {
  getContentWorkoutScheduleMD: async () => {
    try {
      const workoutSchedule = await WorkoutSchedule.findAll();

      return workoutSchedule;
    } catch (error) {
      throwError(404, error);
    }
  },
};
