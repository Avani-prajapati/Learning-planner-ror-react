require 'rails_helper'

RSpec.describe "Posts API", type: :request do

  describe "GET /posts" do
    it "returns all posts" do
      Post.create(title: "First Post", content: "Hello")

      get "/posts"

      expect(response).to have_http_status(200)
      expect(JSON.parse(response.body).length).to eq(1)
    end
  end

  describe "POST /posts" do
  it "creates a new post" do
    post "/posts", params: {
        title: "New Post",
        content: "Testing API"
    }
    expect(response).to have_http_status(201)
  end
end

describe "DELETE /posts/:id" do
  it "deletes a post" do
    post = Post.create(title: "Delete me", content: "Bye")

    delete "/posts/#{post.id}"

    expect(response).to have_http_status(200)
  end
end

end