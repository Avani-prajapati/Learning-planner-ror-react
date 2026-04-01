require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
    @article = articles(:one)
  end

  test "should be valid with valid attributes" do
    assert @article.valid?
  end

  test "should not save without title" do
    @article.title = nil
    assert_not @article.valid?
  end

  test "should require body for text article" do
    @article.body = nil
    @article.article_type = "text"
    assert_not @article.valid?
  end

  test "should not require body for video article" do
    @article.body = nil
    @article.article_type = "video"
    assert @article.valid?
  end

  test "article_type should be valid" do
    @article.article_type = "invalid"
    assert_not @article.valid?
  end

  test "should belong to user" do
    assert_respond_to @article, :user
  end

  test "should have many comments" do
    assert_respond_to @article, :comments
  end

  test "should have many article_tags" do
    assert_respond_to @article, :article_tags
  end

  test "should have many tags through article_tags" do
    assert_respond_to @article, :tags
  end

  test "should have one video" do
    assert_respond_to @article, :video
  end

  test "published scope should return public articles" do
    @article.save
    assert_includes Article.published, @article
  end

  test "draft scope should return private articles" do
    @article.status = "private"
    @article.save
    assert_includes Article.draft, @article
  end

  test "published? should return true for public status" do
    @article.status = "public"
    assert @article.published?
  end

  test "published? should return false for private status" do
    @article.status = "private"
    assert_not @article.published?
  end
end
