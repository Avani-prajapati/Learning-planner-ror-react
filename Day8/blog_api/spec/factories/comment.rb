FactoryBot.define do
  factory :comment do
    body { "Sample Comment" }
    status { "public" }
    association :user
    association :article
  end
end
