# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :sign_up,  mutation: Mutations::SignUp
    field :sign_in,  mutation: Mutations::SignIn

    field :create_article, mutation: Mutations::CreateArticle
    field :update_article, mutation: Mutations::UpdateArticle
    field :delete_article, mutation: Mutations::DeleteArticle

    field :create_comment, mutation: Mutations::CreateComment
    field :delete_comment, mutation: Mutations::DeleteComment

    field :update_profile, mutation: Mutations::UpdateProfile
  end
end
