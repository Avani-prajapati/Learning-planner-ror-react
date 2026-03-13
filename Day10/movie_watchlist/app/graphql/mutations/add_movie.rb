module Mutations
  class AddMovie < BaseMutation
    argument :title, String, required: true

    field :movie,  Types::MovieType, null: true
    field :errors, [String],         null: false

    def resolve(title:)
      # One line — service handles everything
      result = WatchlistService.add(title)

      if result.success?
        { movie: result.movie, errors: [] }
      else
        { movie: nil, errors: result.errors }
      end
    end
  end
end