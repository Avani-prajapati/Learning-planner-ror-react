require_relative "../lib/string_calculator"

RSpec.describe StringCalculator do
  it "returns 0 for empty string" do
    calc = StringCalculator.new
    expect(calc.add("")).to eq(0)
  end
  it "returns number if single number given" do
  calc = StringCalculator.new
  expect(calc.add("1")).to eq(1)
end
it "returns sum of two numbers" do
  calc = StringCalculator.new
  expect(calc.add("1,2")).to eq(3)
end
it "returns sum of multiple numbers" do
  calc = StringCalculator.new
  expect(calc.add("1,2,3,4")).to eq(10)
end
it "handles newline delimiter" do
  calc = StringCalculator.new
  expect(calc.add("1\n2,3")).to eq(6)
end
end