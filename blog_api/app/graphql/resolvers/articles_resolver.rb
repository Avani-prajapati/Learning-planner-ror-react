module Resolvers
  class ArticlesResolver < BaseResolver
    description "Fetch all published articles"
    type [Types::ArticleType], null: false

    def resolve
      Article.published
    end
  end
end
