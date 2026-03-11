module Resolvers
  class PostsResolver < GraphQL::Schema::Resolver
    type [Types::PostType], null: false

    argument :search, String, required: false

    def resolve(search: nil)
      if search
        Post.where("title LIKE ?", "%#{search}%")
      else
        Post.all
      end
    end
  end
end