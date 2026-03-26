module Mutations
  class DeleteComment < BaseMutation
    description "Delete a comment"

    argument :id, ID, required: true

    field :success, Boolean, null: false
    field :errors, [String], null: false

    def resolve(id:)
      return {success: false, errors: ["Not authenticated"]} unless context[:current_user]

      comment = Comment.find_by(id: id)
      return {success: false, errors: ["Comment not found"]} unless comment
      return {success: false, errors: ["Not authorized"]} if comment.user != context[:current_user]

      comment.destroy
      {success: true, errors: []}
    end
  end
end
