class PostsController < ApplicationController
  def index
    @post = Post.new
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = current_admin.posts.build post_params
    @post.save
    redirect_to posts_path
  end

  def show
    @post = Post.find_by id: params[:id]
  end

  def destroy
    @post = Post.find_by id: params[:id]

    @post.destroy
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit :title, :content
  end
end
