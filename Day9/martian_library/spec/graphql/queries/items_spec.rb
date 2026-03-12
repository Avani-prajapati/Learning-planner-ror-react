require 'rails_helper'

RSpec.describe "Items Query", type: :request do

  it "returns items" do
    user = User.create!(first_name:"Elon", email:"elon@mars.com")
    Item.create!(title:"Book", user:user)

    post "/graphql", params: {
      query: "{ items { title } }"
    }

    json = JSON.parse(response.body)

    expect(json["data"]["items"].length).to eq(1)
  end

end