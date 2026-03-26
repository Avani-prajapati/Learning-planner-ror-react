module Types
  class UserType < Types::BaseObject
    description "A user of the blog"

    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :articles, [Types::ArticleType], null: false
    field :profile, Types::ProfileType, null: true
  end
end
