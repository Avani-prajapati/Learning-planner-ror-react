class SessionsController < ApplicationController
    def new
      # renders the login form
    end
  
    def create
      @user = User.find_by(email: params[:email])
  
      if @user && @user.authenticate(params[:password])
        session[:user_id] = @user.id          # ← this is the session cookie being set
        redirect_to root_path, notice: "Welcome back, #{@user.name}!"
      else
        flash.now[:alert] = "Invalid email or password"
        render :new, status: :unprocessable_entity
      end
    end
  
    def destroy
      session[:user_id] = nil                 # ← clears the session cookie = logout
      redirect_to root_path, notice: "Logged out successfully."
    end
  end