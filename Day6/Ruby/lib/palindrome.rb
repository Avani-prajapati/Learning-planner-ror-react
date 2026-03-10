class Palindrome
  def self.palindrome?(str)
    clean = normalize_string(str)
    chars = clean.scan(/\X/)   # split by grapheme clusters
    chars == chars.reverse
  end

  def self.normalize_string(str)
    str
      .unicode_normalize()
      .gsub(/[[:punct:]\s]+/, "")
      .downcase
  end
end