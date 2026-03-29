module Mutations
  class UpdateArticle < BaseMutation
    description "Update an existing article"

    argument :id, ID, required: true
    argument :title, String, required: false
    argument :body, String, required: false
    argument :status, String, required: false

    field :article, Types::ArticleType, null: true
    field :errors, [String], null: false

    def resolve(id:, **attributes)
      if !context[:current_user]
        return {article: nil, errors: ["Not authenticated"]}
      end

      article = Article.find_by(id: id)
      return {article: nil, errors: ["Article not found"]} unless article
      return {article: nil, errors: ["Not authorized"]} if article.user != context[:current_user]

      if article.update(attributes)
        {article: article, errors: []}
      else
        {article: nil, errors: article.errors.full_messages}
      end
    end
  end
end
