# frozen_string_literal: true

require 'colorize'

module Greeter
  class Greeting
    def say_hi(name)
      puts "Hi, #{name}!".colorize(:green)
    end

    def say_bye(name)
      puts "Bye, #{name}!".colorize(:red)
    end
  end
end
