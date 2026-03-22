class ArticleMailer < ApplicationMailer
  def new_article
    @article   = params[:article]
    @recipient = params[:recipient]

    mail(
      to:      @recipient.email,
      subject: "New article: #{@article.title}"
    )
  end
end