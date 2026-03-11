require 'rails_helper'

RSpec.describe "Posts Query", type: :request do
  it "returns posts" do
    Post.create(title: "First Post", body: "Testing")

    post "/graphql", params: {
      query: <<~GRAPHQL
        query {
          posts {
            title
            body
          }
        }
      GRAPHQL
    }

    json = JSON.parse(response.body)

    expect(json["data"]["posts"].length).to eq(1)
  end
end