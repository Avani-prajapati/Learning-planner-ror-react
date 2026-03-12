module Mutations
  class UpdateItem < BaseMutation

    argument :id, ID, required: true
    argument :title, String, required: false
    argument :description, String, required: false
    argument :image_url, String, required: false

    field :item, Types::ItemType, null: true
    field :errors, [String], null: false

    def resolve(id:, **attributes)

      item = Item.find(id)

      if item.update(attributes)
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