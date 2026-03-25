module Types
  class TagType < Types::BaseObject
    description "A tag"

    field :id,       ID,     null: false
    field :name,     String, null: false
    field :articles, [Types::ArticleType], null: false
  end
end