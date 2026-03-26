module Types
  class ArticleType < Types::BaseObject
    description "A blog article"

    field :id, ID, null: false
    field :title, String, null: false
    field :body, String, null: true
    field :status, String, null: false
    field :article_type, String, null: false
    field :video_url, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user, Types::UserType, null: false
    field :comments, [Types::CommentType], null: false
    field :tags, [Types::TagType], null: false

    def video_url
      return nil unless object.video.attached?
      Rails.application.routes.url_helpers.rails_blob_url(
        object.video,
        host: "localhost:3000"
      )
    end
  end
end
