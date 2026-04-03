require "rails_helper"

RSpec.describe "CreateArticle Mutation" do
  let(:user) { create(:user) }

  let(:query) do
    <<~GQL
      mutation($title: String!, $status: String!, $articleType: String!, $body: String) {
        createArticle(input: {
          title: $title,
          status: $status,
          articleType: $articleType,
          body: $body
        }) {
          article {
            id
            title
            body
            status
            articleType
          }
          errors
        }
      }
    GQL
  end

  def execute(variables:, context: {})
    result = BlogApiSchema.execute(
      query,
      variables: variables,
      context: context
    )

    result["data"]["createArticle"]
  end

  context "when user is authenticated" do
    it "creates a text article successfully" do
      result = execute(
        variables: {
          title: "Valid Title",
          status: "public",
          articleType: "text",
          body: "Valid body content"
        },
        context: {current_user: user}
      )

      expect(result["errors"]).to be_empty
      expect(result["article"]["title"]).to eq("Valid Title")
    end

    it "returns error when body is missing for text article" do
      result = execute(
        variables: {
          title: "Valid Title",
          status: "public",
          articleType: "text",
          body: nil
        },
        context: {current_user: user}
      )

      expect(result["errors"]).to include("Body is required for text articles")
    end
  end

  context "when user is not authenticated" do
    it "returns authentication error" do
      result = execute(
        variables: {
          title: "Valid Title",
          status: "public",
          articleType: "text",
          body: "Valid body content"
        }
      )

      expect(result["errors"]).to include("Not authenticated")
    end
  end
end
