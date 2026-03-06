module Walkable
  def walk
    puts "Walking...!"
  end  
end  

class Human
  include Walkable
end 

class Animal
  include Walkable

  def eat
    puts "Eating...!"
  end
end  

person = Human.new.walk
dog = Animal.new
dog.walk
dog.eat
