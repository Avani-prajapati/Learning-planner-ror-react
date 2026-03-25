class Tag < ApplicationRecord
  has_many :article_tags, dependent: :destroy
  has_many :articles, through: :article_tags
  # has_and_belongs_to_many :articles
end
