namespace ExerciseModel {
  enum ExerciseCategory {
    pull,
    push,
    legs,
    core,
    full_body,
    other,
  }

  model Exercise {
    id: int32;
    name: string;
    category: ExerciseCategory;
    description: string | null;
    image_url: string | null;
    is_custom: boolean;
  }

  model CreateExerciseRequest {
    name: string;
    category: ExerciseCategory;
    description?: string;
    image_url?: bytes;
  }
}
