module Catgoose
  # TODO: This can probably be handled natively with EM::Calback.
  class Hook
    attr_accessor :callbacks

    def push(&blk)
      if block_given?
        callbacks << blk
      else
        raise InvalidCallbackError,
              "You need to pass a block or &lambda when adding callbacks"
      end
    end

    def fire(ws, payload = nil)
      callbacks.each { |cb| cb.call(ws, payload) }
      true
    end

    def callbacks
      @callbacks ||= []
    end
  end
end
