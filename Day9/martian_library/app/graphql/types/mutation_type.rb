# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
     field :create_user, mutation: Mutations::CreateUser
     field :create_item, mutation: Mutations::CreateItem
  end
end
