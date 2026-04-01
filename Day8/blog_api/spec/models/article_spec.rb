require "rails_helper"

RSpec.describe Article, type: :model do
  include ActiveJob::TestHelper

  subject(:article) { build(:article) }

  describe "validations" do
    context "with valid attributes" do
      it "is valid" do
        expect(article).to be_valid
      end
    end

    context "when title is missing" do
      before { article.title = nil }

      it "is not valid" do
        expect(article).not_to be_valid
      end
    end

    context "when article_type is text" do
      before do
        article.article_type = "text"
        article.body = nil
      end

      it "requires body" do
        expect(article).not_to be_valid
      end
    end

    context "when article_type is video" do
      before do
        article.article_type = "video"
        article.body = nil
      end

      it "does not require body" do
        expect(article).to be_valid
      end
    end

    context "when article_type is invalid" do
      before { article.article_type = "invalid" }

      it "is not valid" do
        expect(article).not_to be_valid
      end
    end
  end
  describe "associations" do
    context "comments association" do
      it "has many comments" do
        association = described_class.reflect_on_association(:comments)
        expect(association.macro).to eq(:has_many)
      end
      it { should have_many(:comments) }
    end

    context "article_tags association" do
      it "has many article_tags" do
        association = described_class.reflect_on_association(:article_tags)
        expect(association.macro).to eq(:has_many)
      end
    end

    context "tags association" do
      it "has many tags through article_tags" do
        association = described_class.reflect_on_association(:tags)
        expect(association.options[:through]).to eq(:article_tags)
      end
    end
  end

  describe "attachments" do
    it "can have one video attached" do
      expect(article).to respond_to(:video)
    end
  end

  describe "callbacks" do
    before do
      ActiveJob::Base.queue_adapter = :test
      clear_enqueued_jobs
    end

    context "when article is published" do
      it "enqueues NotifyUsersAboutArticleJob" do
        expect {
          create(:article, status: "public")
        }.to have_enqueued_job(NotifyUsersAboutArticleJob)
      end
    end

    context "when article is not published" do
      it "does not enqueue job" do
        expect {
          create(:article, status: "private")
        }.not_to have_enqueued_job(NotifyUsersAboutArticleJob)
      end
    end
  end
end
