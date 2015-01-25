module Catgoose
  # A route mapping represents a to/from value in the router. It's a single
  # router lookup point, essentially. Mostly used for validating route input.
  class RouteMapping
    attr_reader :input, :key, :controller

    def initialize(hash_map)
      @input = hash_map
      validate_input
      @key = input.keys.first
      @controller = input[key]
      validate_controller
    end

  private

    def validate_input
      error = 'Routes must be entered as Hashes representing a source key'\
        '(usually a string) and a destination controller'
      [:[], :keys].each do |k|
        must_respond_to(input, k, BadRouteInputError, error)
      end
      if input.keys.count > 1
        raise BadRouteInputError, 'Only one key/value pair at a time allowed'
      end
    end

    def validate_controller
      methods = [:run]
      error = "Expected #{controller} to respond_to #{methods}"
      methods.each do |k|
        must_respond_to(controller, k, InvalidControllerError, error)
      end
    end

    def must_respond_to(obj, mthd, exception, message)
      raise exception, message unless obj.respond_to?(mthd)
    end
  end
end
