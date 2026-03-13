module Types
  class MovieType < Types::BaseObject
    field :id,         ID,      null: false
    field :title,      String,  null: false
    field :year,       String,  null: true
    field :genre,      String,  null: true
    field :plot,       String,  null: true
    field :poster_url, String,  null: true
    field :imdb_id,    String,  null: true
    field :watched,    Boolean, null: false
    field :rating,     Float,   null: true
  end
end