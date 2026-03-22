import "./routes/user_profile.tsp";
import "./routes/exercise.tsp";

import "@typespec/http";

using Http;
@service(#{ title: "Calisthenics Workout" })
namespace CalisthenicsWorkout {
  @route("/api/v1")
  namespace V1 {
    @route("/user_profile")
    interface UserProfile extends UserProfileRoutes {}

    @route("/exercises")
    interface Exercises extends ExerciseRoutes {}
  }
}
