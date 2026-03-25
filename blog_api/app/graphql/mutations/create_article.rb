module Mutations
  class CreateArticle < BaseMutation
    description "Create a new article"

    argument :title,  String, required: true
    argument :body,   String, required: true
    argument :status, String, required: true

    field :article, Types::ArticleType, null: true
    field :errors,  [String],           null: false

    def resolve(title:, body:, status:)
      return { article: nil, errors: ["Not authenticated"] } unless context[:current_user]

      article = context[:current_user].articles.build(
        title:  title,
        body:   body,
        status: status
      )

      if article.save
        { article: article, errors: [] }
      else
        { article: nil, errors: article.errors.full_messages }
      end
    end
  end
end