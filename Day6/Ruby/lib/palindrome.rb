class Palindrome
  def self.palindrome?(str)
    clean = normalize_string(str)

    puts "Normalized string: #{clean}"
    puts "reverse normalized string: #{clean.reverse}"

    chars = clean.scan(/\X/)   # split by grapheme clusters

    puts "Grapheme clusters: #{chars.reverse}"
    
    chars == chars.reverse
  end

  def self.normalize_string(str)
    str
      .unicode_normalize()
      .gsub(/[[:punct:]\s]+/, "")
      .downcase
  end
end