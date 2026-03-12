require 'rails_helper'

RSpec.describe "UpdateUser Mutation", type: :request do

  it "updates a user" do

    user = User.create!(
      first_name: "Elon",
      email: "elon@mars.com"
    )

    post "/graphql", params: {
      query: "
        mutation {
          updateUser(input :{id: #{user.id}, email: \"new@mail.com\"}) {
            user {
              email
            }
          }
        }
      "
    }

    json = JSON.parse(response.body)

    expect(json["data"]["updateUser"]["user"]["email"]).to eq("new@mail.com")

  end
end