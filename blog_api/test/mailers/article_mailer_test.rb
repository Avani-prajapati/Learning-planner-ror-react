require "test_helper"

class ArticleMailerTest < ActionMailer::TestCase
  test "new_article" do
    mail = ArticleMailer.new_article
    assert_equal "New article", mail.subject
    assert_equal [ "to@example.org" ], mail.to
    assert_equal [ "from@example.com" ], mail.from
    assert_match "Hi", mail.body.encoded
  end
end
