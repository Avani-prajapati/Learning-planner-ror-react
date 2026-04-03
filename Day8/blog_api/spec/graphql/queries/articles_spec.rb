require "rails_helper"

RSpec.describe "Articles Query" do
  before do
    Article.destroy_all
  end
  let!(:published_articles) do
    create_list(:article, 2, status: "public")
  end

  let!(:draft_articles) do
    create_list(:article, 2, status: "private")
  end

  let(:query) do
    <<~GQL
      query {
        articles {
          id
          title
        }
      }
    GQL
  end

  it "returns only published articles" do
    result = BlogApiSchema.execute(query)
    data = result["data"]["articles"]

    expect(data.map { |a| a["id"].to_i })
      .to match_array(published_articles.map(&:id))
  end
end
