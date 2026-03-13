require "rails_helper"

RSpec.describe "AddMovie mutation" do

  let(:mutation) do
    <<~GQL
      mutation($title: String!) {
        addMovie(input: { title: $title }) {
          movie { id title year genre watched }
          errors
        }
      }
    GQL
  end

  def run(title)
    MovieWatchlistSchema.execute(mutation, variables: { title: title })
  end

  context "with a real movie title", :vcr do
    it "fetches from OMDB and saves to database" do
      expect {
        run("Inception")
      }.to change(Movie, :count).by(1)
    end

    it "returns correct movie data" do
      result = run("Inception")

      # Guard against nil result — print it so we can debug
      puts "Full result: #{result.to_h}"

      data = result["data"]["addMovie"]
      expect(data["errors"]).to be_empty
      expect(data["movie"]["title"]).to eq("Inception")
      expect(data["movie"]["watched"]).to eq(false)
    end
  end

  context "with a fake movie title", :vcr do
    it "returns an error and saves nothing" do
      result = run("xyzzy_fake_movie_99999")

      data = result["data"]["addMovie"]
      expect(data["movie"]).to be_nil
      expect(data["errors"]).not_to be_empty
    end
  end

end