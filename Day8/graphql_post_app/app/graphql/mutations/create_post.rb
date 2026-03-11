module Mutations
  class CreatePost < BaseMutation
    argument :title, String, required: true
    argument :body, String, required: true

    field :post, Types::PostType, null: true

    def resolve(title:, body:)
      post = Post.create!(title: title, body: body)

      { post: post }
    end
  end
end