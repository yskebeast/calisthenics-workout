namespace UserProfileModel {
  model UserProfile {
    id: int32;
    better_auth_user_id: string;
    last_name: string;
    first_name: string;
    height: int32 | null;
    weight: float32 | null;
    date_of_birth: plainDate | null;
    avatar_url: string | null;
  }

  model CreateUserProfileRequest {
    last_name: string;
    first_name: string;
    height?: int32;
    weight?: float32;
    date_of_birth?: plainDate;
    avatar?: bytes;
  }
}
