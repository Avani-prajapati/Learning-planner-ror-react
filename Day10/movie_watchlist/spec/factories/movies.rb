FactoryBot.define do
  factory :movie do
   title      { Faker::Movie.title }
    year       { rand(1990..2024).to_s }
    genre      { %w[Action Drama Comedy Thriller].sample }
    plot       { Faker::Lorem.paragraph }
    poster_url { Faker::Internet.url }
    imdb_id    { "tt#{rand(1000000..9999999)}" }
    watched    { false }
    rating     { rand(1.0..10.0).round(1) }
  end
end
