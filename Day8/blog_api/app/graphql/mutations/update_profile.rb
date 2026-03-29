module Mutations
  class UpdateProfile < BaseMutation
    description "Update current user profile bio"

    argument :bio, String, required: false

    field :profile, Types::ProfileType, null: true
    field :errors, [String], null: false

    def resolve(bio: nil)
      if !context[:current_user]
        return {profile: nil, errors: ["Not authenticated"]}
      end

      profile = context[:current_user].profile || context[:current_user].build_profile
      profile.bio = bio if bio.present?

      if profile.save
        {profile: profile, errors: []}
      else
        {profile: nil, errors: profile.errors.full_messages}
      end
    end
  end
end
