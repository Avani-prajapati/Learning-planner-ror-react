class Animal 
  def eat
    puts "Eating...!"
  end
end  

class Dog < Animal
  def bark
    puts "Woof...!"
  end  

  private def sleep
    puts "sleeping!"
  end  

  def rest
    print "Dog "
    sleep
  end  
end  


dog = Dog.new
dog.eat
dog.bark
dog.rest