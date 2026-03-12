require 'rails_helper'

RSpec.describe "Item Query", type: :request do

  it "fetches item by id" do

    user = User.create!(
      first_name: "Elon",
      email: "elon@mars.com"
    )

    item = Item.create!(
      title: "Mars Rover",
      description: "Exploration rover",
      user: user
    )

    post "/graphql", params: {
      query: "
        {
          item(id: #{item.id}) {
            title
          }
        }
      "
    }

    json = JSON.parse(response.body)

    expect(json["data"]["item"]["title"]).to eq("Mars Rover")
  end

end