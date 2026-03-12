require 'rails_helper'

RSpec.describe "User Query", type: :request do

  it "fetches user by id" do

    user = User.create!(
      first_name: "Elon",
      last_name: "Musk",
      email: "elon@mars.com"
    )

    post "/graphql", params: {
      query: "
        {
          user(id: #{user.id}) {
            id
            email
          }
        }
      "
    }

    json = JSON.parse(response.body)

    expect(json["data"]["user"]["email"]).to eq("elon@mars.com")
  end

end