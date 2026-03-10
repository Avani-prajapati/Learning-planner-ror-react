class PostsController < ApplicationController

  def index
    posts = Post.all
    render json: posts
  end

  def show
    post = Post.find(params[:id])
    render json: post
  end

  def create
    post = Post.new(post_params)

    if post.save
      render json: post, status: :created
    else
      render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

def update
  post = Post.find(params[:id])

  if post.update(post_params)
    render json: post
  else
    render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
  end
end

  def destroy
    post = Post.find(params[:id])
    post.destroy

    render json: { message: "Post deleted successfully" }
  end

  def publish
    post = Post.find(params[:id])
    render json: { message: "Post '#{post.title}' published successfully" }
  end

  def recent
  posts = Post.order(created_at: :desc).limit(2)
  render json: posts
end

  private

  def post_params
    params.permit(:title, :content)
  end

end