class CommentsController < ApplicationController
  before_action :require_login

  def create
    @article = Article.find(params[:article_id])
    @comment = @article.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      NotifyAuthorAboutCommentJob.perform_later(@comment)
      redirect_to article_path(@article), notice: "Comment added!"
    else
      redirect_to article_path(@article), alert: "Comment could not be saved."
    end
  end

  def destroy
    @article = Article.find(params[:article_id])
    @comment = @article.comments.find(params[:id])

    if @comment.user != current_user
      redirect_to article_path(@article), alert: "Not authorized." and return
    end

    @comment.destroy
    redirect_to article_path(@article), status: :see_other
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :status)
  end
end