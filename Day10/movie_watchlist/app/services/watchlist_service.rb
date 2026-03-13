class WatchlistService

  # Add a movie to the watchlist by title
  # Fetches details from OMDB, then saves to DB
  def self.add(title)
    new.add(title)
  end

  def add(title)
    # Step 1 — fetch from OMDB
    fetch_result = MovieFetcherService.search(title)

    # If OMDB failed, stop here and return the error
    return fetch_result if fetch_result.failure?

    # Step 2 — build the movie record
    movie = Movie.new(
      fetch_result.movie_data.merge(watched: false)
    )

    # Step 3 — save to database
    if movie.save
      Result.success(movie: movie)
    else
      Result.failure(movie.errors.full_messages)
    end
  end

  # Mark a movie as watched
  def self.mark_watched(movie_id)
    movie = Movie.find_by(id: movie_id)
    return Result.failure("Movie not found") if movie.nil?

    if movie.update(watched: true)
      Result.success(movie: movie)
    else
      Result.failure(movie.errors.full_messages)
    end
  end

  # Remove a movie from the watchlist
  def self.remove(movie_id)
    movie = Movie.find_by(id: movie_id)
    return Result.failure("Movie not found") if movie.nil?

    movie.destroy
    Result.success(message: "Movie removed")
  end
end