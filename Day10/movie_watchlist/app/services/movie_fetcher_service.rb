class MovieFetcherService
  BASE_URL = "https://www.omdbapi.com"

  def self.search(title)
    response = HTTParty.get(BASE_URL, query: {
      apikey: ENV["OMDB_API_KEY"],
      t: title
    })

    return nil if response["Response"] == "False"

    {
      title:      response["Title"],
      year:       response["Year"],
      genre:      response["Genre"],
      plot:       response["Plot"],
      poster_url: response["Poster"],
      imdb_id:    response["imdbID"],
      rating:     response["imdbRating"].to_f
    }
  end
end