class ArticlesController < ApplicationController
  before_action :require_login, except: [:index, :show]
  before_action :set_article,   only: [:show, :edit, :update, :destroy]

  def index
    @articles = Article.published   
  end

  def show
  end

  def new
    @article = Article.new
  end

  def create
    @article = current_user.articles.build(article_params)   # ties article to logged-in user

    if @article.save
      if @article.status == "public"
        NotifyUsersAboutArticleJob.perform_later(@article)
      end  
      redirect_to @article, notice: "Article created!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit

    if @article.user != current_user
      redirect_to root_path, alert: "Not authorized."  
    end  

    
  end

  def update
    if @article.user != current_user
      redirect_to root_path, alert: "Not authorized." and return
    end  

    if @article.update(article_params)
      redirect_to @article, notice: "Article updated!"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    if @article.user != current_user
      redirect_to root_path, alert: "Not authorized." and return
    end

    @article.destroy
    redirect_to root_path, status: :see_other, notice: "Article deleted."
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :body, :status)
  end
end