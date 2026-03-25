module Types
  class ProfileType < Types::BaseObject
    description "A user profile"

    field :id,        ID,     null: false
    field :bio,        String, null: true
    field :avatar_url, String, null: true

    def avatar_url
      return nil unless object.avatar.attached?
      Rails.application.routes.url_helpers.rails_blob_url(
        object.avatar,
        host: "localhost:3000"
      )
    end
  end
end
