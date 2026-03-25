module Resolvers
  class TagsResolver < BaseResolver
    description "Fetch all tags"
    type [Types::TagType], null: false

    def resolve
      Tag.all
    end
  end
end
