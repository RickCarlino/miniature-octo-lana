module CatGoose
  class Router
    attr_reader :map

    def initialize
      @map = Hash.new(CatGoose::NotFoundController)
    end

    def route(mapping)
      # 1. Make sure it's a Hash where .keys().count == 1
      # 2. Make sure it can quack to .success?(), .errors and .result
    end

    def not_found(mapping)
      # 1. Make sure it's a Hash where .keys().count == 1
      # 2. Make sure it can quack to .success?(), .errors and .result
    end

    def draw
      if block_given?
        yield(self)
      else
        raise 'put a real exception here'
      end
    end
  end
end
