module Mutations
  class CreateItem < BaseMutation

    argument :title, String, required: true
    argument :description, String, required: false
    argument :image_url, String, required: false
    argument :user_id, ID, required: true

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(title:, description:, image_url:, user_id:)
      item = Item.new(
        title: title,
        description: description,
        image_url: image_url,
        user_id: user_id
      )

      if item.save
        {
          item: item,
          errors: []
        }
      else
        {
          item: nil,
          errors: item.errors.full_messages
        }
      end
    end
  end
end