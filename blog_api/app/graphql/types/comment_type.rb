module Types
  class CommentType < Types::BaseObject
    description "A comment on an article"

    field :id,         ID,     null: false
    field :body,       String, null: false
    field :status,     String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user,       Types::UserType,    null: false
    field :article,    Types::ArticleType, null: false
  end
end