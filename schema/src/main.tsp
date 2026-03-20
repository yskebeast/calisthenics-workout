import "../src/models/sample.tsp";

import "@typespec/http";

using Http;
@service(#{ title: "Calisthenics Workout" })
namespace CalisthenicsWorkout {
  @route("/sample")
  @get
  op sample(): {
    @statusCode statusCode: 200;
    @body data: SampleModel.Sample;
  };
}
