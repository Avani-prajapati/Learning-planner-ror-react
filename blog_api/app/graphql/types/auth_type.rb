module Types
  class AuthType < Types::BaseObject
    description "Authentication result"

    field :token, String, null: true
    field :user, Types::UserType, null: true
    field :errors, [String], null: false
  end
end
