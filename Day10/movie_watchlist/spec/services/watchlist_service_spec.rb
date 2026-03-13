require "rails_helper"

RSpec.describe WatchlistService do

  describe ".add" do
    context "when OMDB finds the movie", :vcr do
      it "saves movie to database" do
        expect {
          WatchlistService.add("Inception")
        }.to change(Movie, :count).by(1)
      end

      it "returns a success result" do
        result = WatchlistService.add("Inception")
        expect(result.success?).to be true
        expect(result.movie).to be_a(Movie)
        expect(result.movie.title).to eq("Inception")
        expect(result.movie.watched).to eq(false)
      end
    end

    context "when OMDB does not find the movie", :vcr do
      it "returns a failure result" do
        result = WatchlistService.add("xyzzy_fake_99999")
        expect(result.failure?).to be true
        expect(result.errors).not_to be_empty
      end

      it "does not save anything to database" do
        expect {
          WatchlistService.add("xyzzy_fake_99999")
        }.not_to change(Movie, :count)
      end
    end
  end

  describe ".mark_watched" do
    let!(:movie) { create(:movie, watched: false) }

    it "marks the movie as watched" do
      result = WatchlistService.mark_watched(movie.id)
      expect(result.success?).to be true
      expect(movie.reload.watched).to eq(true)
    end

    it "returns failure for missing movie" do
      result = WatchlistService.mark_watched(99999)
      expect(result.failure?).to be true
      expect(result.errors).to include("Movie not found")
    end
  end

  describe ".remove" do
    let!(:movie) { create(:movie) }

    it "removes the movie from database" do
      expect {
        WatchlistService.remove(movie.id)
      }.to change(Movie, :count).by(-1)
    end

    it "returns failure for missing movie" do
      result = WatchlistService.remove(99999)
      expect(result.failure?).to be true
    end
  end

end