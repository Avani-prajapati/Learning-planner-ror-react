module Types
  class ArticleType < Types::BaseObject
    description "A blog article"

    field :id, ID, null: false
    field :title, String, null: false
    field :body, String, null: false
    field :status, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user, Types::UserType, null: false
    field :comments, [Types::CommentType], null: false
    field :tags, [Types::TagType], null: false
  end
end
