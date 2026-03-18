class Article < ApplicationRecord
    include Visible
    
    has_many :comments, dependent: :destroy
    validates :title, presence: true, length: { minimum: 5 , maximum: 10 }
    validates :body, presence: true, length: { minimum: 10 }
    validate do |article|
        errors.add :title, :too_short, message: "is not long enough"
    end
end
