module Mutations
  class CreateComment < BaseMutation
    argument :body, String, required: true
    argument :post_id, ID, required: true

    field :comment, Types::CommentType, null: true

    def resolve(body:, post_id:)
      comment = Comment.create(
        body: body,
        post_id: post_id
      )
      {comment: comment }
    end
  end
end