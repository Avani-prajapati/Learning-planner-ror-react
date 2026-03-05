def stock_picker(prices)
  return 'prices collection empty' if prices.empty?

  lowest_price, candidate_buy_day = prices[0], 0
  biggest_profit, result_days = 0, [0, 0]

  prices.each_with_index do |price, day|
    if price < lowest_price
      lowest_price, candidate_buy_day = price, day
      next
    end

    if (price - lowest_price) > biggest_profit
      biggest_profit = price - lowest_price
      result_days = [candidate_buy_day, day]
    end
  end

  result_days[0] == result_days[1] ? 'dont buy-it' : result_days
end

puts stock_picker([17,3,6,9,15,8,6,1,10])