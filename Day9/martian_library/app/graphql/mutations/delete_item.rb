module Mutations
  class DeleteItem < BaseMutation

    argument :id, ID, required: true

    field :message, String, null: false

    def resolve(id:)
      item = Item.find(id)
      item.destroy

      {
        message: "Item deleted successfully"
      }
    end

  end
end