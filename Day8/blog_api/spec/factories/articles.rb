FactoryBot.define do
  factory :article do
    title { "Test Article Title" }
    body { "This is the test article body content." }
    association :user
  end
end
