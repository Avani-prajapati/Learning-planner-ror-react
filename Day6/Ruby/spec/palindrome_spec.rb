require_relative "../lib/palindrome"

RSpec.describe Palindrome do
  describe ".palindrome?" do
    it "returns true for empty string" do
      expect(Palindrome.palindrome?("")).to be true
    end

    it "return true for single character" do
      expect(Palindrome.palindrome?("a")).to be true
    end

    it "returns true for racecar" do
      expect(Palindrome.palindrome?("racecar")).to be true
    end

    it "returns true for abba" do
      expect(Palindrome.palindrome?("abba")).to be true
    end

    it "returns false for hello" do
      expect(Palindrome.palindrome?("hello")).to be false
    end

    it "ignores spaces and punctuation" do
      expect(Palindrome.palindrome?("A man, a plan, a canal Panama")).to be true
    end

    it "handles emoji palindrome" do
     expect(Palindrome.palindrome?("😀racecar😀")).to be true
    end

    it "detects emoji non palindrome" do
     expect(Palindrome.palindrome?("😀hello🎉")).to be false
    end

    # Gujarati
     it "supports Gujarati palindrome" do
      expect(Palindrome.palindrome?("નયન")).to be true
    end

    it "detects Gujarati non palindrome" do
      expect(Palindrome.palindrome?("સરર")).to be false
    end

    # Marathi
    it "supports Marathi palindrome" do
      expect(Palindrome.palindrome?("निलयलिन")).to be true
    end

    it "detects Marathi non palindrome" do
      expect(Palindrome.palindrome?("मला")).to be false
    end

     # Malayalam
    it "detects malayalam palindrome" do
     expect(Palindrome.palindrome?("തൂത")).to be true
     expect(Palindrome.palindrome?("നടന")).to be true
    end

    it "detects malayalam non palindrome" do
      expect(Palindrome.palindrome?("കേരളം")).to be false
    end

     # Tamil
    it "detects tamil palindrome" do
      expect(Palindrome.palindrome?("கலக")).to be true
    end

    it "detects tamil non palindrome" do
      expect(Palindrome.palindrome?("தமிழ்")).to be false
    end

    # Hindi
    it "detects hindi palindrome" do
      expect(Palindrome.palindrome?("नयन")).to be true
    end

    it "detects hindi non palindrome" do
      expect(Palindrome.palindrome?("मेरा")).to be false
    end

    # Hindi and gujarati
    it "detects hindi and gujarati palindrome" do
      expect(Palindrome.palindrome?("नयન")).to be false
    end
  end
end