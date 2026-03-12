# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
     field :create_user, mutation: Mutations::CreateUser
     field :update_user, mutation: Mutations::UpdateUser
     field :delete_user, mutation: Mutations::DeleteUser

     field :create_item, mutation: Mutations::CreateItem
     field :update_item, mutation: Mutations::UpdateItem
     field :delete_item, mutation: Mutations::DeleteItem
  end
end
