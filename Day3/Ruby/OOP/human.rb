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

module Flyable
  def fly
    puts "Flying...!"
  end  
end  

class Human
  include Walkable
  include Eatable
end 

class Animal
  include Walkable
  include Eatable
  extend Flyable
end  

person = Human.new.walk
dog = Animal.new
dog.walk
dog.eat
Animal.fly