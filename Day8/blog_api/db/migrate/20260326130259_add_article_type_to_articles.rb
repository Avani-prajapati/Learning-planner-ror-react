class AddArticleTypeToArticles < ActiveRecord::Migration[8.1]
  def change
    add_column :articles, :article_type, :string
  end
end
