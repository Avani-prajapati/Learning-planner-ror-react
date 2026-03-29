module Mutations
  class DeleteArticle < BaseMutation
    description "Delete an article"

    argument :id, ID, required: true

    field :success, Boolean, null: false
    field :errors, [String], null: false

    def resolve(id:)
      if !context[:current_user]
        return {success: false, errors: ["Not authenticated"]}
      end

      article = Article.find_by(id: id)
      return {success: false, errors: ["Article not found"]} unless article
      return {success: false, errors: ["Not authorized"]} if article.user != context[:current_user]

      article.destroy
      {success: true, errors: []}
    end
  end
end
