Rails.application.config.middleware.use(
  Committee::Middleware::ResponseValidation,
  schema_path: Rails.root.join("../schema/openapi/openapi.yaml").to_s,
  strict_reference_validation: true,
  raise: !Rails.env.production?
)
