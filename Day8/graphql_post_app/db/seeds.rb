# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
post1 = Post.create(title: "First Post", body: "Learning GraphQL")

post1.comments.create(body: "Great post!")
post1.comments.create(body: "Very helpful")

post2 = Post.create(title: "Rails API", body: "Using Rails for APIs")

post2.comments.create(body: "Nice explanation")