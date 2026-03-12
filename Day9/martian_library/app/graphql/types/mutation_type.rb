# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
     field :create_user, mutation: Mutations::CreateUser
     field :create_item, mutation: Mutations::CreateItem
     field :update_user, mutation: Mutations::UpdateUser
     field :update_item, mutation: Mutations::UpdateItem
  end
end
