module Types
  class QueryType < Types::BaseObject

    field :users, [Types::UserType], null: false
    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end

    field :items, [Types::ItemType], null: false
    field :item, Types::ItemType, null: false do
      argument :id, ID, required: true
    end

    def users
      User.all
    end

    def user(id:)
      User.find(id)
    end

    def items
      Item.includes(:user)
    end

    def item(id:)
      Item.find(id)
    end

  end
end