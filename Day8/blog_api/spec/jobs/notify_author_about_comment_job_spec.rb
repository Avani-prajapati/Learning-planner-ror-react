require "rails_helper"

RSpec.describe NotifyAuthorAboutCommentJob, type: :job do
  include ActiveJob::TestHelper

  describe "#perform" do
    let(:author) { create(:user) }
    let(:other_user) { create(:user) }
    let(:article) { create(:article, user: author) }

    before do
      clear_enqueued_jobs
    end

    context "when commenter is not the author" do
      let(:comment) { create(:comment, user: other_user, article: article) }

      it "enqueues comment mailer" do
        expect {
          described_class.perform_now(comment)
        }.to have_enqueued_job(ActionMailer::MailDeliveryJob)
      end
    end

    context "when commenter is the author" do
      let(:comment) { create(:comment, user: author, article: article) }

      it "does not enqueue comment mailer" do
        expect {
          described_class.perform_now(comment)
        }.not_to have_enqueued_job(ActionMailer::MailDeliveryJob)
      end
    end
  end
end
