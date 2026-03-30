require "rails_helper"

RSpec.describe Resolvers::ArticleResolver do
  include GraphQL::Testing::Helpers.for(BlogApiSchema)

  let(:user) do
    User.create!(
      email: "test@example.com",
      password: "password123",
      name: "Test User"
    )
  end

  let!(:article) do
    Article.create!(
      title: "Test Article",
      body: "Test content",
      user: user,
      status: "public",
      article_type: "text"
    )
  end

  it "resolves the article by id" do
    result = run_graphql_field(
      "Query.article",
      nil,
      arguments: {id: article.id.to_s}
    )

    expect(result.id).to eq(article.id)
    expect(result.title).to eq(article.title)
  end

  it "returns nil when article not found" do
    result = run_graphql_field(
      "Query.article",
      nil,
      arguments: {id: "999999"}
    )

    expect(result).to be_nil
  end

  it 'resolves article with video type' do
    video_article = Article.create!(
      title: "Video Tutorial",
      body: "Video content without length restriction",
      user: user,
      status: "public",
      article_type: "video"
    )
    
    result = run_graphql_field(
      'Query.article',
      nil,
      arguments: { id: video_article.id.to_s }
    )
    
    expect(result.id).to eq(video_article.id)
    expect(result.article_type).to eq("video")
  end

  
end
