module Walkable
  def walk
    puts "Walking...!"
  end  
end  

module Eatable
  def eat
    puts "Eating...!"
  end  
end  

class Human
  include Walkable
  include Eatable
end 

class Animal
  include Walkable
  include Eatable
end  

person = Human.new.walk
dog = Animal.new
dog.walk
dog.eat
