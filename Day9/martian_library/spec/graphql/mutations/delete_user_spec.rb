require 'rails_helper'

RSpec.describe "DeleteUser Mutation", type: :request do

  it "deletes a user" do

    user = User.create!(
      first_name: "Elon",
      email: "elon@mars.com"
    )

    post "/graphql", params: {
      query: "
        mutation {
          deleteUser(input: {id: #{user.id}}) {
            message
          }
        }
      "
    }

    json = JSON.parse(response.body)

    expect(json["data"]["deleteUser"]["message"]).to eq("User deleted successfully")
    expect(User.find_by(id: user.id)).to be_nil

  end
end