class Article < ApplicationRecord
  include Visible

  after_commit :notify_users, on: :create

  has_many :comments, dependent: :destroy
  belongs_to :user
  has_many :article_tags, dependent: :destroy
  has_many :tags, through: :article_tags
  # has_and_belongs_to_many :tags
  has_one_attached :video

  scope :published, -> { where(status: "public") }
  scope :draft, -> { where(status: "private") }

  validates :title, presence: true, length: {minimum: 5}
  validates :body, presence: true, length: {minimum: 10}, if: -> { article_type == "text" }
  validates :article_type, inclusion: {in: %w[text video]}

  def published?
    status == "public"
  end

  def notify_users
    if published?
      NotifyUsersAboutArticleJob.perform_later(self)
    end
  end
end
