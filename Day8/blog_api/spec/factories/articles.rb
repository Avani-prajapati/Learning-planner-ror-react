FactoryBot.define do
  factory :article do
    title { "Valid Title" }
    body { "Valid body content" }
    article_type { "text" }
    status { "public" }
    association :user
  end
end
