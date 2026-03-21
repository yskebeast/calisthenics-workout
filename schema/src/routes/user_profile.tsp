import "../models/user_profile.tsp";

using Http;

interface UserProfileRoutes {
  @get
  show(): {
    @statusCode statusCode: 200;
    @body data: UserProfileModel.UserProfile;
  } | {
    @statusCode statusCode: 404;
    @body error: { error: string };
  };

  @post
  create(
    @body body: UserProfileModel.CreateUserProfileRequest,
  ): {
    @statusCode statusCode: 201;
    @body data: UserProfileModel.UserProfile;
  } | {
    @statusCode statusCode: 422;
    @body error: { errors: string[] };
  };
}
