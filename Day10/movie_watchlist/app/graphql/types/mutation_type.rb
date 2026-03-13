# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
     field :add_movie, mutation: Mutations::AddMovie
  end
end
