class User < ApplicationRecord
    has_secure_password

    has_one :profile, dependent: :destroy
    has_many :articles, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :article_tags, through: :articles
    has_many :tags, through: :article_tags

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true
end
