require 'rails_helper'

RSpec.describe "UpdateItem Mutation", type: :request do

  it "updates an item" do

    user = User.create!(first_name: "Elon", email: "elon@mars.com")

    item = Item.create!(
      title: "Old Rover",
      description: "Mars rover",
      user: user
    )

    post "/graphql", params: {
      query: "
        mutation {
          updateItem(input:{id: #{item.id}, title: \"New Rover\"}) {
            item {
              title
            }
            errors
          }
        }
      "
    }

    json = JSON.parse(response.body)
    puts response.body

    expect(json["data"]["updateItem"]["item"]["title"]).to eq("New Rover")

  end
end