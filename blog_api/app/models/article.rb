class Article < ApplicationRecord
    include Visible
    
    has_many :comments, dependent: :destroy
    belongs_to :user
    # has_many :article_tags, dependent: :destroy
    # has_many :tags, through: :article_tags
    has_and_belongs_to_many :tags

    validates :title, presence: true, length: { minimum: 5 , maximum: 10 }
    validates :body, presence: true, length: { minimum: 10 }
end
