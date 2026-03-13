require "rails_helper"

RSpec.describe MovieFetcherService do

  describe ".search" do

    # :vcr tag tells VCR to record/replay this test's HTTP calls
    # The cassette name is auto-generated from the test description
    context "when movie exists on OMDB", :vcr do
      it "returns movie details" do
        # This calls the real OMDB API on first run
        # On every run after — reads from spec/vcr_cassettes/...yml
        result = MovieFetcherService.search("Inception")

        # Check we got the right data back
        expect(result).not_to be_nil
        expect(result[:title]).to   eq("Inception")
        expect(result[:year]).to    eq("2010")
        expect(result[:imdb_id]).to eq("tt1375666")
        expect(result[:rating]).to  be_a(Float)
      end

      it "returns genre information" do
        result = MovieFetcherService.search("Inception")
        expect(result[:genre]).to include("Sci-Fi")
      end
    end

    context "when movie does NOT exist on OMDB", :vcr do
      it "returns nil" do
        result = MovieFetcherService.search("xyzzy_fake_movie_12345")
        expect(result).to be_nil
      end
    end

    context "without VCR — to test what happens when API is down" do
      it "returns nil gracefully when API fails" do
        # Stub means: pretend the HTTP call returns this fake response
        # without making a real request
        allow(HTTParty).to receive(:get).and_return(
          { "Response" => "False", "Error" => "Movie not found!" }
        )

        result = MovieFetcherService.search("Anything")
        expect(result).to be_nil
      end
    end

  end

end