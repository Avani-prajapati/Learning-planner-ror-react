module Resolvers
  class ArticlesResolver < BaseResolver
    description "Fetch all published articles"
    type [Types::ArticleType], null: false

    argument :tag_id, ID, required: false

    def resolve(tag_id: nil)
      if tag_id.present?
        Article.published.joins(:tags).where(tags: { id: tag_id })
      else
        Article.published
      end
    end
  end
end