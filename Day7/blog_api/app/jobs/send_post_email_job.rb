class SendPostEmailJob < ApplicationJob
  queue_as :default

  def perform(post_id)
    post = Post.find(post_id)

    puts "Sending email for post: #{post.title}"

    # simulate email sending
    sleep 2

    puts "Email sent successfully"
  end
end