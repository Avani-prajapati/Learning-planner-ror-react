# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
user = User.create!(
  first_name: "Elon",
  last_name: "Musk",
  email: "elon@mars.com"
)

Item.create!(
  title: "Martian Book",
  description: "Book about Mars",
  image_url: "https://example.com/book.jpg",
  user: user
)

Item.create!(
  title: "Mars Rover",
  description: "Exploration rover",
  image_url: "https://example.com/rover.jpg",
  user: user
)