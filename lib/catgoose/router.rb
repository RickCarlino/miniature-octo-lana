module Catgoose
  class Router
    attr_reader :map

    def initialize
      @map = Hash.new(Catgoose::NotFoundController)
    end

    def route(mapping)
      map.merge(RouteMapping.new(mapping).input)
    end

    def not_found(mapping)
      # 1. Make sure it's a Hash where .keys().count == 1
      # 2. Make sure it can quack to .success?(), .errors and .result
    end

    def draw
      yield(self)
    end
  end
end
