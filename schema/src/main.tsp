import "../src/routes/user_profile.tsp";

import "@typespec/http";

using Http;
@service(#{ title: "Calisthenics Workout" })
namespace CalisthenicsWorkout {
  @route("/api/v1")
  namespace V1 {
    @route("/user_profile")
    interface UserProfile extends UserProfileRoutes {}
  }
}
