module Catgoose
  class Session
    # Is @socket needed? Remove if not.
    attr_reader :socket, :channels, :store

    def initialize(socket, channels = Catgoose.channels)
      @socket, @channels, @store = socket, channels, {}
    end

    def subscribe(name)
      # TODO handle invalid subscription names
      channels[name.to_sym].subscribe(self)
    end

    def unsubscribe(name)
      channels[name.to_sym].unsubscribe(self)
    end

    def [](key)
      store[key.to_sym]
    end

    def []=(key, value)
      store[key.to_sym] = value
    end
  end
end
