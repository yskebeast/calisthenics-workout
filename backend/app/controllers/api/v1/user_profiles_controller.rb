module Api
  module V1
    class UserProfilesController < ApplicationController
      before_action :set_profile, only: [ :show, :update ]

      def show
        render json: profile_json(@profile)
      end

      def create
        profile = UserProfile.new(profile_params.merge(better_auth_user_id: @current_user_id))
        if profile.save
          render json: profile_json(profile), status: :created
        else
          render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @profile.update(profile_params)
          render json: profile_json(@profile)
        else
          render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

        def set_profile
          @profile = UserProfile.find_by(better_auth_user_id: @current_user_id)
          unless @profile
            render json: { error: "Not found" }, status: :not_found
          end
        end

        def profile_params
          params.require(:user_profile).permit(:last_name, :first_name, :height, :weight, :date_of_birth, :avatar)
        end

        def profile_json(profile)
          {
            id: profile.id,
            better_auth_user_id: profile.better_auth_user_id,
            last_name: profile.last_name,
            first_name: profile.first_name,
            height: profile.height,
            weight: profile.weight&.to_f,
            date_of_birth: profile.date_of_birth,
            avatar_url: profile.avatar.attached? ? rails_blob_url(profile.avatar, only_path: true) : nil
          }
        end
    end
  end
end
