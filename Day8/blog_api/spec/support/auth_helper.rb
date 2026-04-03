module AuthHelper
  def auth_headers(user)
    {
      "Authorization" => "Bearer #{user.id}"
    }
  end
end
