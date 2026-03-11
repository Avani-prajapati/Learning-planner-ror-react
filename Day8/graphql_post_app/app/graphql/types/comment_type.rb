module Types
  class CommentType < Types::BaseObject
    field :id, ID, null: false
    field :body, String, null: false
  end
end