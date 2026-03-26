module Mutations
  class CreateArticle < BaseMutation
    description "Create a new article"

    argument :title, String, required: true
    argument :body, String, required: false
    argument :status, String, required: true
    argument :article_type, String, required: true
    argument :tag_ids, [ID], required: false
    argument :video, ApolloUploadServer::Upload, required: false

    field :article, Types::ArticleType, null: true
    field :errors, [String], null: false

    def resolve(title:, body: nil, status:, article_type:, tag_ids: [], video: nil)
      return { article: nil, errors: ["Not authenticated"] } unless context[:current_user]
    
      if article_type == "text" && body.blank?
        return { article: nil, errors: ["Body is required for text articles"] }
      end
    
      if article_type == "video" && video.nil?
        return { article: nil, errors: ["Video file is required for video articles"] }
      end
    
      article = context[:current_user].articles.build(
        title: title,
        body: body,
        status: status,
        article_type: article_type
      )
    
      if article.save
        article.tag_ids = tag_ids if tag_ids.any?
        article.video.attach(video) if video.present?
        { article: article, errors: [] }
      else
        { article: nil, errors: article.errors.full_messages }
      end
    end
  end
end
