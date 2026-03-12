require 'rails_helper'

RSpec.describe "DeleteItem Mutation", type: :request do

  it "deletes an item" do

    user = User.create!(first_name: "Elon", email: "elon@mars.com")

    item = Item.create!(
      title: "Mars Rover",
      description: "Exploration rover",
      user: user
    )

    post "/graphql", params: {
      query: "
        mutation {
          deleteItem(input: {id: #{item.id}}) {
            message
          }
        }
      "
    }

    json = JSON.parse(response.body)

    expect(json["data"]["deleteItem"]["message"]).to eq("Item deleted successfully")
    expect(Item.find_by(id: item.id)).to be_nil

  end
end