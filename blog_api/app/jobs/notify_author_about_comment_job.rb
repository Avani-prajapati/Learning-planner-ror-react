class NotifyAuthorAboutCommentJob < ApplicationJob
  queue_as :default

  def perform(comment)
    # only notify if commenter is not the article author
    if comment.user != comment.article.user
      CommentMailer.with(comment: comment)
                   .new_comment
                   .deliver_later
    end
  end
end