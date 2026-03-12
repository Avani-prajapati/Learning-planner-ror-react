module Resolvers
  class ItemsResolver < GraphQL::Schema::Resolver

    type [Types::ItemType], null: false

    def resolve
      Item.includes(:user)
    end

  end
end