module Types
  class QueryType < Types::BaseObject

   field :items, resolver: Resolvers::ItemsResolver
    field :users, [Types::UserType], null: false

    def users
      User.all
    end

  end
end