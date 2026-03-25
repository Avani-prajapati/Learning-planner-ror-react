class CommentMailer < ApplicationMailer
  def new_comment
    @comment = params[:comment]
    @article = @comment.article
    @author = @article.user

    mail(
      to: @author.email,
      subject: "New comment on your article: #{@article.title}"
    )
  end
end
