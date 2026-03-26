# Preview all emails at http://localhost:3000/rails/mailers/article_mailer
class ArticleMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/article_mailer/new_article
  def new_article
    ArticleMailer.new_article
  end
end
