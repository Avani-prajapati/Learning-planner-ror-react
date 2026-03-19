module Authentication
    def login
      puts "User #{@name} logged in"
    end
end   

module Finder
    def find_by_email(email)
        puts "user is #{@name} email"
        User.class_variable_get(:@@user).find{|user| user.email == email}
    end      
end   

class User
    @@user = []

    include Authentication
    extend Finder 

    attr_reader :name , :email
    def initialize(name, email)
       @name = name
       @email = email

       @@user << self
    end    
    
end 

# class Human < User
#     def classvarible
#         puts "#{@@user}"
#     end    
# end    

# human = Human.new('Avani','avani@gmail.com')
# human.classvarible

user = User.new('Avani','avani@gmail.com')
user.login

found_user = User.find_by_email('avani@gmail.com')
puts found_user.name
puts found_user.email
