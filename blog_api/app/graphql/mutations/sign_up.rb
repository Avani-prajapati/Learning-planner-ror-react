module Mutations
  class SignUp < BaseMutation
    description "Register a new user"

    argument :name,                  String, required: true
    argument :email,                 String, required: true
    argument :password,              String, required: true
    argument :password_confirmation, String, required: true

    field :token,  String,          null: true
    field :user,   Types::UserType, null: true
    field :errors, [String],        null: false

    def resolve(name:, email:, password:, password_confirmation:)
      user = User.new(
        name:                  name,
        email:                 email,
        password:              password,
        password_confirmation: password_confirmation
      )

      if user.save
        { token: JsonWebToken.encode(user_id: user.id), user: user, errors: [] }
      else
        { token: nil, user: nil, errors: user.errors.full_messages }
      end
    end
  end
end