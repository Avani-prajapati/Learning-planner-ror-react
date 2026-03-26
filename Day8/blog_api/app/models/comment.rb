class Comment < ApplicationRecord
  include Visible

  after_commit :notify_author, on: :create

  belongs_to :article
  belongs_to :user

  def published?
    status == "public"
  end

  def notify_author
    if published?
      NotifyAuthorAboutCommentJob.perform_later(self)
    end
  end
end
