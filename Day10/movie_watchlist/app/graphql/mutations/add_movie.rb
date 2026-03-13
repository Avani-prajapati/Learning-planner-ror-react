module Mutations
  class AddMovie < BaseMutation
    argument :title, String, required: true

    field :movie,  Types::MovieType, null: true
    field :errors, [String],         null: false

    def resolve(title:)
      movie_data = MovieFetcherService.search(title)

      if movie_data.nil?
        return { movie: nil, errors: ["Movie '#{title}' not found on OMDB"] }
      end

      movie = Movie.new(movie_data.merge(watched: false))

      if movie.save
        { movie: movie, errors: [] }
      else
        { movie: nil, errors: movie.errors.full_messages }
      end
    end
  end
end