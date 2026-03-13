# A simple wrapper that carries success/failure + data back to the caller
# Usage:
#   Result.success(movie: movie)   → result.success? = true
#   Result.failure("Not found")    → result.success? = false
class Result
  attr_reader :data, :errors

  def initialize(success:, data: {}, errors: [])
    @success = success
    @data    = data
    @errors  = Array(errors)  # always an array even if one string passed
  end

  # Build a success result — pass any data as keyword args
  def self.success(data = {})
    new(success: true, data: data)
  end

  # Build a failure result — pass error message(s)
  def self.failure(errors)
    new(success: false, errors: errors)
  end

  def success?
    @success
  end

  def failure?
    !@success
  end

  # Shortcut to get any value from data by key
  # result.movie  instead of  result.data[:movie]
  def method_missing(name, *args)
    data[name] || super
  end

  def respond_to_missing?(name, include_private = false)
    data.key?(name) || super
  end
end