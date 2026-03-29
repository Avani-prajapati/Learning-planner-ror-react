class NotifyAuthorAboutCommentJob < ApplicationJob
  queue_as :default

  def perform(comment)
    if comment.user != comment.article.user
      CommentMailer.with(comment: comment)
        .new_comment
        .deliver_later
    end
  end
end
