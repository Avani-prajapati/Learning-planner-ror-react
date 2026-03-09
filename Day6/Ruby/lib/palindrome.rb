class Palindrome
  def self.palindrome?(str)
    clean = normalize_string(str)
    clean == clean.reverse
  end

  def self.normalize_string(str)
    str
      .unicode_normalize()
      .gsub(/[[:punct:]\s]+/, "")
      .downcase
  end
end