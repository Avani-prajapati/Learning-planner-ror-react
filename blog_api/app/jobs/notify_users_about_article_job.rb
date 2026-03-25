class NotifyUsersAboutArticleJob < ApplicationJob
  queue_as :default

  def perform(article)
    # as per Active Job guide — GlobalID serializes the AR object automatically
    recipients = User.where.not(id: article.user_id)

    recipients.each do |recipient|
      # official guide pattern: with(params).action.deliver_later
      ArticleMailer.with(article: article, recipient: recipient)
        .new_article
        .deliver_later
    end
  end
end
