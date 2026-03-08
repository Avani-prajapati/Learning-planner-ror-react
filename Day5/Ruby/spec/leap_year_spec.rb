require_relative "../lib/leap_year"

RSpec.describe LeapYear do
  it "returns true if year divisible by 4" do
    expect(LeapYear.leap?(1996)).to eq(true)
  end

  it "returns false if year not divisible by 4" do
  expect(LeapYear.leap?(1997)).to eq(false)
  end

  it "returns false if year divisible by 100 but not 400" do
    expect(LeapYear.leap?(1900)).to eq(false)
  end

  it "returns true if year divisible by 400" do
    expect(LeapYear.leap?(2000)).to eq(true)
  end
end