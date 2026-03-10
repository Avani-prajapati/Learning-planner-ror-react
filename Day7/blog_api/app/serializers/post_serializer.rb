class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :summary, :content_length

  def summary
    object.content[0..20]
  end

  def content_length
    object.content.length
  end
end