module Resolvers
  class ArticleResolver < BaseResolver
    description "Fetch a single article by ID"
    type Types::ArticleType, null: true

    argument :id, ID, required: true

    def resolve(id:)
      Article.find_by(id: id)
    end
  end
end
