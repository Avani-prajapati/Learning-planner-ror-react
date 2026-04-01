require "rails_helper"

RSpec.describe NotifyUsersAboutArticleJob, type: :job do
  include ActiveJob::TestHelper

  describe "#perform" do
    let(:author) { create(:user) }
    let!(:other_users) { create_list(:user, 3) }
    let!(:article) { create(:article, user: author) }

    before { clear_enqueued_jobs }

    it "enqueues emails for all users except the author" do
      recipients = User.where.not(id: author.id)

      expect {
        described_class.perform_now(article)
      }.to have_enqueued_mail(ArticleMailer, :new_article)
        .exactly(recipients.count).times
    end

    it "does not enqueue an email for the author" do
      described_class.perform_now(article)

      enqueued_recipients = enqueued_jobs.map { |j| j[:args] }.flatten
      expect(enqueued_recipients).not_to include(author.id)
    end

    context "when there are no other users" do
      before do
        User.where.not(id: author.id).destroy_all
        clear_enqueued_jobs
      end

      it "does not enqueue any emails" do
        expect {
          described_class.perform_now(article)
        }.not_to have_enqueued_mail(ArticleMailer, :new_article)
      end
    end
  end
end
