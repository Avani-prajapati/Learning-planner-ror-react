class HelloController < ApplicationController
   def index
    render json: { message: "Hello Rails API" }
   end

   def greet
    render json: { message: "Hello, Avani!" }
   end 
end
