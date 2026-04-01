require "test_helper"

class CommentTest < ActiveSupport::TestCase
  def setup
    @comment = comments(:one)
  end

  test "should belongs to article" do
    assert_respond_to @comment, :article
  end

  test "should belongs to user" do
    assert_respond_to @comment, :user
  end

  test "published? should return true for public status" do
    @comment.status = "public"
    assert @comment.published?
  end

  test "published? should return false for private status" do
    @comment.status = "private"
    assert_not @comment.published?
  end
end
