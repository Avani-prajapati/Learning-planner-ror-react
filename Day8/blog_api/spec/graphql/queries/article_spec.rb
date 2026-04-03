require "rails_helper"

RSpec.describe "Article Query", type: :request do
  let!(:article) { create(:article, status: "public") }

  let(:query) do
    <<~GQL
      query($id: ID!) {
        article(id: $id) {
          id
          title
        }
      }
    GQL
  end

  it "fetches article by id" do
    post "/graphql", params: {query: query, variables: {id: article.id}}

    data = JSON.parse(response.body)["data"]["article"]

    expect(data["id"].to_i).to eq(article.id)
    expect(data["title"]).to eq(article.title)
  end
end
