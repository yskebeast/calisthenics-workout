class ApplicationController < ActionController::API
  before_action :authenticate!

  private

    def authenticate!
      secret = request.headers["X-Internal-Secret"]
      unless secret == ENV["INTERNAL_SECRET"]
        return render json: { error: "Forbidden" }, status: :forbidden
      end

      @current_user_id = request.headers["X-User-Id"]
      unless @current_user_id
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
end
