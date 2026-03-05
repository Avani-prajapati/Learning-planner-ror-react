def ceaser_cipher(string, shift)
  ciphered_string = ""
  string = string.downcase

  string.each_char do |char|
    if char.ord.between?(97, 122)
      shifted_char = ((char.ord - 97 + shift) % 26) + 97
      ciphered_string += shifted_char.chr
    else
      ciphered_string += char
    end
  end
  ciphered_string
end  

puts ceaser_cipher("Hello, World!", 3) 
puts ceaser_cipher("Ruby is fun!", 5) 