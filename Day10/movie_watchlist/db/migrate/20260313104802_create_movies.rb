class CreateMovies < ActiveRecord::Migration[8.1]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :year
      t.string :genre
      t.text :plot
      t.string :poster_url
      t.string :imdb_id
      t.boolean :watched
      t.decimal :rating

      t.timestamps
    end
  end
end
