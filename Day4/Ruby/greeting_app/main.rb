require_relative 'lib/greeter'

greeter = Greeter::Greeting.new

puts "Enter your name:"
name = gets.chomp

greeter.say_hi(name)
greeter.say_bye(name)
