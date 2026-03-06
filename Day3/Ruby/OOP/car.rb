class Car
  def initialize(brand,year)
    @brand = brand
    @year = year
  end  

  def info
    puts "Car brand: #{@brand}, year: #{@year}"
  end  
end  

car = Car.new("Toyoto",2020)
car.info