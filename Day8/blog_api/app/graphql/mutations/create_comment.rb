module Mutations
  class CreateComment < BaseMutation
    description "Add a comment to an article"

    argument :article_id, ID, required: true
    argument :body, String, required: true
    argument :status, String, required: false

    field :comment, Types::CommentType, null: true
    field :errors, [String], null: false

    def resolve(article_id:, body:, status: "public")
      if !context[:current_user]
        return {comment: nil, errors: ["Not authenticated"]}
      end

      article = Article.find_by(id: article_id)
      return {comment: nil, errors: ["Article not found"]} unless article

      comment = article.comments.build(body: body, status: status)
      comment.user = context[:current_user]

      if comment.save
        {comment: comment, errors: []}
      else
        {comment: nil, errors: comment.errors.full_messages}
      end
    end
  end
end
