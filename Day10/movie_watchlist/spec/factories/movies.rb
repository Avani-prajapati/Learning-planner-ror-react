FactoryBot.define do
  factory :movie do
    title { "MyString" }
    year { "MyString" }
    genre { "MyString" }
    plot { "MyText" }
    poster_url { "MyString" }
    imdb_id { "MyString" }
    watched { false }
    rating { "9.99" }
  end
end
