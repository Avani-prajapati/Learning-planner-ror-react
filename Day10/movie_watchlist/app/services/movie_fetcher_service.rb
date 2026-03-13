class MovieFetcherService
  BASE_URL = "https://www.omdbapi.com"

  def self.search(title)
    new(title).search
  end

  def initialize(title)
    @title = title
  end

  def search
    response = HTTParty.get(BASE_URL, query: {
      apikey: ENV["OMDB_API_KEY"],
      t: @title
    })

    if response["Response"] == "False"
      # Return a failure Result with clear error message
      return Result.failure("Movie '#{@title}' not found on OMDB")
    end

    # Return a success Result with the movie data
    Result.success(
      movie_data: {
        title:      response["Title"],
        year:       response["Year"],
        genre:      response["Genre"],
        plot:       response["Plot"],
        poster_url: response["Poster"],
        imdb_id:    response["imdbID"],
        rating:     response["imdbRating"].to_f
      }
    )

  # Handle network errors gracefully — don't crash the whole app
  rescue StandardError => e
    Result.failure("Could not reach OMDB: #{e.message}")
  end
end