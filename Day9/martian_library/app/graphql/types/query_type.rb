module Types
  class QueryType < Types::BaseObject

    field :items, [Types::ItemType], null: false
    field :users, [Types::UserType], null: false

    def items
      Item.includes(:user)
    end

    def users
      User.all
    end

  end
end