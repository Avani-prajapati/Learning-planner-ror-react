module Mutations
  class DeleteUser < BaseMutation

    argument :id, ID, required: true

    field :message, String, null: false

    def resolve(id:)
      user = User.find(id)
      user.destroy

      {
        message: "User deleted successfully"
      }
    end

  end
end