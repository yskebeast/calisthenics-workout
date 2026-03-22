import "../models/exercise.tsp";

using Http;

interface ExerciseRoutes {
  @get
  list(): {
    @statusCode statusCode: 200;
    @body data: ExerciseModel.Exercise[];
  } | {
    @statusCode statusCode: 404;
    @body error: {
      error: string;
    };
  };

  @get
  @route("/{id}")
  get(@path id: int32): {
    @statusCode statusCode: 200;
    @body data: ExerciseModel.Exercise;
  } | {
    @statusCode statusCode: 404;
    @body error: {
      error: string;
    };
  };

  @post
  create(@body body: ExerciseModel.CreateExerciseRequest): {
    @statusCode statusCode: 201;
    @body data: ExerciseModel.Exercise;
  } | {
    @statusCode statusCode: 422;
    @body error: {
      errors: string[];
    };
  };

  @delete
  @route("/{id}")
  delete(@path id: int32): {
    @statusCode statusCode: 204;
  } | {
    @statusCode statusCode: 404;
    @body error: {
      error: string;
    };
  };
}
