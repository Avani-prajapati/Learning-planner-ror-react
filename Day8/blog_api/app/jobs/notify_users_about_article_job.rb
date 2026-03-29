class NotifyUsersAboutArticleJob < ApplicationJob
  queue_as :default

  def perform(article)
    recipients = User.where.not(id: article.user_id)

    recipients.each do |recipient|
      ArticleMailer.with(article: article, recipient: recipient)
        .new_article
        .deliver_later
    end
  end
end
